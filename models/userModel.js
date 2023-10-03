require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일 로드
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

module.exports.join = (id, passwd) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT id FROM admin WHERE id=?', id, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                if (rows.length) {
                    reject('이미 존재하는 ID');
                } else {
                    conn.query(
                        'INSERT INTO admin(id, passwd) VALUES (?,?)',
                        [id, passwd],
                        (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve('회원가입 성공');
                            }
                        }
                    );
                }
            }
        });
    });
};
module.exports.login = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT *\
            FROM user\
            WHERE id = ?',
            [id],
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length) {
                        // User authenticated successfully
                        resolve(rows); // Return the user object
                    } else {
                        // Authentication failed
                        reject('Invalid credentials');
                    }
                }
            }
        );
    });
};

module.exports.adminLogin = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT *\
            FROM admin\
            WHERE id = ?',
            [id],
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length) {
                        // User authenticated successfully
                        resolve(rows); // Return the user object
                    } else {
                        // Authentication failed
                        reject('Invalid credentials');
                    }
                }
            }
        );
    });
};


module.exports.getUserCar = (id) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT car_number\
        FROM car\
        WHERE id = ?';
        conn.query(sql, [id], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                // 만약 rows가 빈 배열이면 null 반환, 아니면 결과 반환
                resolve(rows.length > 0 ? rows : null);
            }
        });
    });
};


//     return new Promise((resolve, reject) => {
//         let sql = 'SELECT id FROM user WHERE name = ? and phone_number = ?';
//         conn.query(sql, [name, phone_number], (err, rows, fields) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 if (rows.length) {
//                     resolve(rows);
//                 } else {
//                     reject('존재하지 않는 사용자');
//                 }
//             }
//         });
//     });
// };

// module.exports.changePw = (id, hashedPassword, phone_number, name) => {
//     return new Promise((resolve, reject) => {
//         let sql = 'UPDATE user\
//         SET passwd = ?\
//         WHERE id = ? AND phone_number = ? AND name = ?';
//         conn.query(sql, [hashedPassword, id, phone_number, name], (err, rows, fields) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(rows);
//             }
//         });
//     });
// };

module.exports.getUserList = () => {
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT
            user.id,
            user.name,
            user.phone_number,
            user.email,
            user.dong,
            user.ho,
            GROUP_CONCAT(car.car_number) AS car_number
        FROM
            user
        LEFT JOIN
            car ON user.id = car.id
        GROUP BY
            user.id, user.name, user.phone_number, user.email
        `;

        conn.query(sql, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.getUserFromValue = (column, value) => {
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT
            user.id,
            user.name,
            user.phone_number,
            user.email,
            user.dong,
            user.ho,
            GROUP_CONCAT(car.car_number) AS car_number
        FROM
            user
        LEFT JOIN
            car ON user.id = car.id
        WHERE
            ${column} LIKE ?
        GROUP BY
            user.id, user.name, user.phone_number, user.email
        `;

        conn.query(sql, [value], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};




module.exports.getUserInfo = (id) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT id,phone_number, email, name, dong, ho\
        FROM user\
        WHERE id = ?';
        conn.query(sql, id, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
exports.updateUserInfo = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM user WHERE id = ?';
      conn.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  
  
  exports.deleteUserInfo = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM user WHERE id = ?';
      conn.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  