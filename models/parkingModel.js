require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일 로드
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

module.exports.getCarList = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM parking';
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};