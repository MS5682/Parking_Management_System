const pool = require('../db');
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

module.exports.getNotification = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM notification';
        pool.query(sql, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.deleteNotification = (notify_id) => {
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM notification WHERE notify_id = ?';
        pool.query(sql, [notify_id], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.notifyLongTermParking = () => {
    return new Promise((resolve, reject) => {
        // 7일 이상 주차된 데이터를 검색하는 SQL 쿼리
        let sql = 'SELECT section, section_number, floor, car_num, entrance\
            FROM parking\
            WHERE `exit` IS NULL\
            AND TIMESTAMPDIFF(DAY, entrance, NOW()) > 7;';
        
        pool.query(sql, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                console.log(rows);
                // 검색된 데이터를 순회하면서 알림 생성
                rows.forEach((row) => {
                    const { section, section_number, floor, car_num, entrance } = row;
                    const daysPassed = Math.floor((new Date() - entrance) / (1000 * 60 * 60 * 24)); // 일(day) 단위로 계산
                    const notifyContext = `${floor}층 ${section}구역 ${section_number}번 ${car_num}차량이 ${formatDate(entrance)} 이후로 주차한지 ${daysPassed}일이 지났습니다.`;
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
};

module.exports = exports;