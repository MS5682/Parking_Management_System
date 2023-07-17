var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var parkingRouter = require('./routes/parkingRouter');
var postsRouter = require('./routes/posts');
var boardsRouter = require('./routes/boards');
var userRouter = require('./routes/userRouter');

var app = express();

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
app.use('/', indexRouter);
app.use('/parking', parkingRouter);
app.use('/posts', postsRouter);
app.use('/boards', boardsRouter);
app.use('/user', userRouter);
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
