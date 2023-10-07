var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
const pool = require('./db');

var parkingRouter = require('./routes/parkingRouter');
var postsRouter = require('./routes/posts');
var boardsRouter = require('./routes/boards');
var userRouter = require('./routes/userRouter');
var apiRouter = require('./routes/apiRouter');

var app = express();
const cors = require('cors');
app.use(cors());                // app과의 통신을 위한 cors(보안상 문제가 있어 테스트 용도로 사용중)

var notifyRouter = require('./routes/notifyRouter');

var app = express();

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]; 
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}`;
}

function notifyLongTermParking() {
    return new Promise((resolve, reject) => {
        // 7일 이상 주차된 방문차량을 검색하는 SQL 쿼리
        let sql = 'SELECT p.section, p.section_number, p.floor, p.car_num, p.entrance\
            FROM parking p JOIN car c\
            ON p.car_num = c.car_number\
            WHERE p.`exit` IS NULL\
            AND c.visitor = 1\
            AND TIMESTAMPDIFF(DAY, p.entrance, NOW()) > 7;';
        
        pool.query(sql, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                // 검색된 데이터를 순회하면서 알림 생성
                rows.forEach((row) => {
                    const { section, section_number, floor, car_num, entrance } = row;
                    const daysPassed = Math.floor((new Date() - entrance) / (1000 * 60 * 60 * 24)); // 일(day) 단위로 계산
                    const notifyContext = `${floor}층 ${section}구역 ${section_number}번 방문차량 ${car_num}이 ${formatDate(entrance)} 이후로 주차한지 ${daysPassed}일이 지났습니다.`;
                    const notifyTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // 현재 시간을 TIMESTAMP 형식으로 변환
                    
                    // 알림 테이블에 알림 추가
                    let notifySql = 'INSERT INTO notification (context, notify_time) VALUES (?, ?);';
                    pool.query(notifySql, [notifyContext, notifyTime], (err, notifyRows, fields) => {
                        if (err) {
                            reject(err);
                        }
                    });
                });
                resolve(rows); // 알림 생성이 완료된 경우 Promise 해결
            }
        });
    });
}

function deleteVisitorCar() { //일주일 넘은 방문객 차량 삭제
  return new Promise((resolve, reject) => {
      let sql = 'DELETE FROM car\
      WHERE registration <= DATE_SUB(NOW(), INTERVAL 7 DAY);\
      ';
      
      pool.query(sql, (err, rows, fields) => {
          if (err) {
              reject(err);
          } else {
              resolve(rows); 
          }
      });
  });
}

// 12시간 간격으로 실행
setInterval(notifyLongTermParking, 12 * 60 * 60 * 1000); 
setInterval(deleteVisitorCar, 12 * 60 * 60 * 1000); 

function requireLogin(req, res, next) {
  if (req.session.admin || req.session.user) {
    next(); // 다음 미들웨어 또는 라우트 핸들러로 이동
  }else{
    // 로그인되지 않은 경우
    res.redirect('/user/login'); // 로그인 페이지로 리디렉션
  }
}

app.use(
  session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Set 'secure' to 'true' if using HTTPS
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//router
app.use('/notify', requireLogin, notifyRouter);
app.use('/parking', requireLogin, parkingRouter);
app.use('/posts', requireLogin, postsRouter);
app.use('/boards', requireLogin, boardsRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/', (req, res) => {
  res.redirect('/user/login');
});
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('세션 삭제 실패:', err);
      return res.status(500).send('세션 삭제 실패');
    }
    
    res.clearCookie('session');
    res.redirect('/'); // 로그아웃 후 리디렉션할 경로
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(express.static('public'));
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
const PORT = process.env.PORT || 3000; 
app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
*/

module.exports = app;
