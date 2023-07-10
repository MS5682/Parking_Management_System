const pool = require('../db');

exports.getBoards = (callback) => {
    const query = 'SELECT * FROM board';
    pool.query(query, (err, results) => {
        if(err) throw err;
        callback(results);
    });
};

exports.getComments = (callback) => {
    const query = 'SELECT * FROM comment';
    pool.query(query, (err, results) => {
        if(err) throw err;
        callback(results);
    });
};

exports.getCommentsByPost = (postCode, callback) => {
    const query = 'SELECT * FROM comment WHERE post_code = ?';
    pool.query(query, [postCode], (err, results) => {
        if(err) throw err;
        callback(results);
    });
};

exports.createComment = (commentData, callback) => {
    const query = 'INSERT INTO comment (post_code, comment_date, comment_contents, id) VALUES (?, ?, ?, ?)';
    pool.query(query, [commentData.post_code, commentData.comment_date, commentData.comment_contents, commentData.id], (err, results) => {
        if(err) throw err;
        callback(results);
    });
};

module.exports = exports;