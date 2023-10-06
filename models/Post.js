const pool = require('../db');

exports.getPostsByBoardCode = (boardCode, callback) => {
  const query = `
    SELECT p.post_code, p.post_date, p.title, p.user_id, p.view, b.board_name, p.board_code
    FROM post p
    JOIN board b ON p.board_code = b.board_code
    WHERE b.board_code = ?
    `;
  pool.query(query, [boardCode], (err, results) => {
    if(err) throw err;
    callback(results);
  });
};

exports.createPost = (postData, callback) => {
  const query = `
    INSERT INTO post (board_code, post_date, title, post_contents, view, file, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  pool.query(query, [postData.board_code, postData.post_date, postData.title,
     postData.post_contents, postData.view, postData.file, postData.id], (err, results) => {
    if(err) throw err;
    callback(results.insertId);
  });
};

exports.getPostByPostCode = (postCode, callback) => {
  const query = 'SELECT * FROM post WHERE post_code = ?';
  pool.query(query, [postCode], (err, results) => {
    if(err) throw err;
    callback(results);
  });
};

// UPDATE
exports.updatePostByPostCode = (postCode, postData, callback) => {
  const query = 'UPDATE post SET title=?, post_contents=?, file=?, post_date=? WHERE post_code=?';
  pool.query(query, [postData.title, postData.post_contents, postData.file, postData.post_date, postCode], (err, results) => {
    if(err) throw err;
    callback(results);
  });
};

// DELETE
exports.deletePostByPostCode = (postCode, callback) => {
  const query = 'DELETE FROM post WHERE post_code=?';
  pool.query(query, [postCode], (err, results) => {
    if(err) throw err;
    callback(results);
  });
};

module.exports = exports;