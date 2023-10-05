const pool = require('../db');


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


module.exports = exports;