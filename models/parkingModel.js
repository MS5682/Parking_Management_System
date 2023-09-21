require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일 로드
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

module.exports.getCarListDetail = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT\
        section,\
        section_number,\
        floor,\
        MAX(parking.car_num) AS car_num,\
        COUNT(parking.car_num) AS car_num_exists,\
        MAX(user.phone_number) AS phone_number,\
        MAX(user.id) AS id\
        FROM parking LEFT OUTER JOIN user\
        ON parking.car_num = user.car_number\
        WHERE parking.`exit` IS NULL\
        GROUP BY section, section_number, floor;';
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.getCarList = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT section,\
        section_number,\
        floor,\
        COUNT(car_num) AS car_num_exists\
        FROM parking\
        WHERE `exit` IS NULL\
        GROUP BY section, section_number, floor;';
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};