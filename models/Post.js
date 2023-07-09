require('dotenv').config();
const mysql = require('mysql');

const pool  = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

// CREATE
exports.createPost = (postData, callback) => {
  const query = 'INSERT INTO post (board_code, post_date, title, post_contents, view, file, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(query, [postData.board_code, postData.post_date, postData.title, postData.post_contents, postData.view, postData.file, postData.id], (err, results) => {
    if(err) throw err;
    callback(results);
  });
};

// READ
exports.getPosts = (callback) => {
  const query = 'SELECT * FROM post';
  pool.query(query, (err, results) => {
    if(err) throw err;
    callback(results);
  });
};

exports.getPostById = (postCode, callback) => {
  const query = 'SELECT * FROM post WHERE post_code = ?';
  pool.query(query, [postCode], (err, results) => {
    if(err) throw err;
    callback(results);
  });
};

// UPDATE
exports.updatePost = (postCode, postData, callback) => {
  const query = 'UPDATE post SET board_code=?, post_date=?, title=?, post_contents=?, view=?, file=?, id=? WHERE post_code=?';
  pool.query(query, [postData.board_code, postData.post_date, postData.title, postData.post_contents, postData.view, postData.file, postData.id, postCode], (err, results) => {
    if(err) throw err;
    callback(results);
  });
};

// DELETE
exports.deletePost = (postCode, callback) => {
  const query = 'DELETE FROM post WHERE post_code=?';
  pool.query(query, [postCode], (err, results) => {
    if(err) throw err;
    callback(results);
  });
};

module.exports = exports;
