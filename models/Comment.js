const pool = require('../db');

exports.getComments = (callback) => {
    const query = 'SELECT * FROM comment';
    pool.query(query, (err, results) => {
        if(err) throw err;
        callback(results);
    });
};
exports.getCommentsByPostCode = (postCode, callback) => {
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

exports.updateCommentByCommentCode = (commentCode, commentData, callback) => {
    const query = 'UPDATE comment SET comment_contents=? WHERE comment_code=?';
    pool.query(query, [commentData.comment_contents, commentCode], (err, results) => {
        if(err) throw err;
        callback(results);
    });
};


exports.deleteCommentByCommentCode = (commentCode, callback) => {
    const query = 'DELETE FROM comment WHERE comment_code=?';
    pool.query(query, [commentCode], (err, results) => {
        if(err) throw err;
        callback(results);
    });
};

exports.deleteCommentsByPostCode = (postCode, callback) => {
    const query = 'DELETE FROM comment WHERE post_code=?';
    pool.query(query, [postCode], (err, results) => {
        if(err) throw err;
        callback(results);
    });
};


module.exports = exports;