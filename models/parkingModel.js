require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일 로드
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});


module.exports.getCarListDetail = (floor) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT\
        parking.section,\
        parking.section_number,\
        parking.floor,\
        MAX(parking.car_num) AS car_num,\
        COUNT(parking.car_num) AS car_num_exists,\
        MAX(user.phone_number) AS phone_number,\
        MAX(user.id) AS id\
        FROM parking\
        LEFT OUTER JOIN car ON parking.car_num = car.car_number\
        LEFT OUTER JOIN user ON car.user_id = user.id\
        WHERE parking.`exit` IS NULL\
        AND parking.floor = ?\
        GROUP BY parking.section, parking.section_number, parking.floor;';
        conn.query(sql, [floor], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.getCarList = (floor) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT\
        parking.section,\
        parking.section_number,\
        parking.floor,\
        COUNT(car.car_number) AS car_num_exists\
        FROM parking\
        LEFT OUTER JOIN car ON parking.car_num = car.car_number\
        WHERE parking.`exit` IS NULL\
        AND parking.floor = ?\
        GROUP BY parking.section, parking.section_number, parking.floor;';
        conn.query(sql, [floor], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.getMyCarLoc = (car_number, floor) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT\
        parking.section,\
        parking.section_number,\
        parking.floor\
        FROM parking\
        LEFT OUTER JOIN car ON parking.car_num = car.car_number\
        WHERE parking.`exit` IS NULL AND car.car_number = ?\
        AND parking.floor = ?\
        GROUP BY parking.section, parking.section_number, parking.floor;';
        conn.query(sql, [car_number, floor], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.getCarCnt = (floor) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT COUNT(car.car_number) AS car_cnt\
        FROM parking\
        LEFT OUTER JOIN car ON parking.car_num = car.car_number\
        WHERE parking.`exit` IS NULL\
        AND parking.floor = ?';
        conn.query(sql, [floor], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.getCarExist = (section, sectionNumber, floor) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM parking \
        LEFT OUTER JOIN car ON parking.car_num = car.car_number\
        WHERE parking.section = ? AND parking.sectionNumber = ? AND parking.floor = ? AND parking.exit IS NULL';
        conn.query(sql, [section, sectionNumber, floor], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.checkParkingSpace = (section, sectionNumber, floor) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT *\
        FROM parking\
        WHERE section = ? AND section_number = ? AND floor = ? AND `exit` IS NULL;';
        conn.query(sql, [section, sectionNumber, floor], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.updateParkingInfo = (section, sectionNumber, floor, carNumber, currentTime) => {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE parking\
        SET `exit` = ?\
        WHERE section = ? AND section_number = ? AND floor = ? AND car_num = ? AND `exit` IS NULL;';
        conn.query(sql, [currentTime, section, sectionNumber, floor, carNumber], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
module.exports.addParkingInfo = (section, sectionNumber, floor, carNumber, currentTime) => {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO parking (car_num, section, section_number, entrance, floor)\
        VALUES (?, ?, ?, ?, ?);';
        conn.query(sql, [carNumber, section, sectionNumber, currentTime, floor], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
