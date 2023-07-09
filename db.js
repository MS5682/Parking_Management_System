const mysql = require('mysql');
require('dotenv').config();

// .env 파일에서 환경변수를 가져와 MySQL 연결 생성

const conn = mysql.createConnection({
    host: '3.36.218.124',
    user: 'root',
    password: '1234',
    port: '52338',
    database: 'parking_system',
  });

conn.connect(err => {
  if(err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + conn.threadId);
});

module.exports = conn; // 생성한 connection 객체를 다른 파일에서 사용 가능하게 내보냄