require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일 로드
const pool = require('../db');

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
        LEFT OUTER JOIN user ON car.id = user.id\
        WHERE parking.`exit` IS NULL\
        AND parking.floor = ?\
        GROUP BY parking.section, parking.section_number, parking.floor;';
        pool.query(sql, [floor], (err, rows, fields) => {
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
        pool.query(sql, [floor], (err, rows, fields) => {
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
        pool.query(sql, [car_number, floor], (err, rows, fields) => {
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
        let sql = 'SELECT COUNT(car_num) AS car_cnt\
        FROM parking\
        WHERE `exit` IS NULL\
        AND floor = ?';
        pool.query(sql, [floor], (err, rows, fields) => {
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
        pool.query(sql, [section, sectionNumber, floor], (err, rows, fields) => {
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
        pool.query(sql, [currentTime, section, sectionNumber, floor, carNumber], (err, rows, fields) => {
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
        // SQL 쿼리: 주차 정보 추가
        let sql = 'INSERT INTO parking (car_num, section, section_number, entrance, floor) VALUES (?, ?, ?, ?, ?);';
        pool.query(sql, [carNumber, section, sectionNumber, currentTime, floor], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                // 주차 정보 추가 성공 후, car 테이블에서 해당 carNumber를 찾습니다.
                let checkCarSql = 'SELECT * FROM car WHERE car_number = ?';
                pool.query(checkCarSql, [carNumber], (err, carRows, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        // carNumber가 car 테이블에 존재하지 않으면 알림 추가
                        if (carRows.length === 0) {
                            let notifyContext = `미등록 차량 ${carNumber}이 주차되었습니다.`;
                            
                            // 알림 테이블에 알림 추가
                            let notifySql = 'INSERT INTO notification (context, notify_time) VALUES (?, ?);';
                            pool.query(notifySql, [notifyContext, currentTime], (err, notifyRows, fields) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(rows); // 주차 정보 추가 성공 및 알림 추가 성공
                                }
                            });
                        } else {
                            resolve(rows); // 주차 정보 추가 성공 (carNumber가 이미 car 테이블에 존재)
                        }
                    }
                });
            }
        });
    });
};
