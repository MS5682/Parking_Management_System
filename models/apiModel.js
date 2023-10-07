require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일 로드
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});


// mobile api
module.exports.getParkingStatus = function(floor){
    return new Promise(function(resolve, reject){
        let sql = 'SELECT COUNT(*) as status FROM parking WHERE floor = ?'
        conn.query(sql,[floor], function(err, rows){
            if(err){
                reject(err);
            }
            else{
                resolve(rows);
            }
        })
    })
}