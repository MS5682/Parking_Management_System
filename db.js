const mysql = require('mysql');
require('dotenv').config();

// .env 파일에서 환경변수를 가져와 MySQL 연결 생성

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  });

module.exports = pool; // 생성한 connection 객체를 다른 파일에서 사용 가능하게 내보냄