require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일 로드
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

module.exports.join = (id, passwd, user_code, phone_number, email, name, car_number) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT id FROM user WHERE id=?', id, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                if (rows.length) {
                    reject('이미 존재하는 ID');
                } else {
                    conn.query(
                        'INSERT INTO user(id, passwd, user_code, phone_number, email, name, car_number) VALUES (?,?,?,?,?,?,?)',
                        [id, passwd, user_code, phone_number, email, name, car_number],
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

module.exports.login = (id, user_code) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT * FROM user WHERE id = ? AND user_code = ?',
            [id, user_code],
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

module.exports.findId = (name, phone_number) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT id FROM user WHERE name = ? and phone_number = ?';
        conn.query(sql, [name, phone_number], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                if (rows.length) {
                    resolve(rows);
                } else {
                    reject('존재하지 않는 사용자');
                }
            }
        });
    });
};

module.exports.changePw = (id, hashedPassword, phone_number, name) => {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE user\
        SET passwd = ?\
        WHERE id = ? AND phone_number = ? AND name = ?';
        conn.query(sql, [hashedPassword, id, phone_number, name], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.getUserList = () => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT id, phone_number, email, name, car_number, user_code\
        FROM user\
        ORDER BY user_code DESC';
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
        let sql = `SELECT id, phone_number, email, name, car_number, user_code
        FROM user
        WHERE ${column} LIKE ?
        ORDER BY user_code DESC`;

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
        let sql = 'SELECT id, phone_number, email, name, car_number, user_code\
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

exports.updateUserInfoWithPassword = (id, hashedPassword, user_code, phone_number, email, name, car_number) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE user\
       SET passwd = ?, user_code = ?, phone_number = ?, email = ?, name = ?, car_number = ?\
        WHERE id = ?';
      conn.query(sql, [hashedPassword, user_code, phone_number, email, name, car_number, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  
  exports.updateUserInfoWithoutPassword = (id, user_code, phone_number, email, name, car_number) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE user\
      SET user_code = ?, phone_number = ?, email = ?, name = ?, car_number = ?\
      WHERE id = ?';
      conn.query(sql, [user_code, phone_number, email, name, car_number, id], (err, result) => {
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
  