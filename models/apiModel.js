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
        let sql = 'SELECT COUNT(*) as status FROM parking WHERE `exit` IS NULL AND floor = ?'
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

module.exports.getParkingLotCarInformation = function(floor, callback){
    const query = 'SELECT section, section_number FROM parking WHERE floor = ? AND `exit` IS NULL;';
    conn.query(query, [floor], (err, results) => {
        if(err) throw err;
        callback(results);
    });
}

module.exports.getMyCarLocation = function(car_number, callback){
    const query = "SELECT * FROM parking WHERE car_num = ? AND `exit` IS NULL;";
    conn.query(query, car_number, function(err, result){
        if(err) throw err;
        callback(result[0]);
        console.log(result[0]);
    })
}