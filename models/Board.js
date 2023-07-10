const pool = require('../db');

exports.getBoards = (callback) => {
    const query = 'SELECT * FROM board';
    pool.query(query, (err, results) => {
        if(err) throw err;
        callback(results);
    });
};

exports.getBoardbyName = (board_name, callback) => {
    const query = 'SELECT * FROM board WHERE board_name =?';
    pool.query(query, [board_name], (err, results) => {
        if(err) throw err;
        callback(results);
    });
};

exports.getBoardbyId = (boardCode, callback) => {
    const query = 'SELECT * FROM board WHERE board_code =?';
    pool.query(query, [boardCode], (err, results) => {
        if(err) throw err;
        callback(results);
    });
};

exports.createBoard = (board_name, callback) => {
    const query = 'INSERT INTO board (board_name) VALUES (?)';
    pool.query(query, [board_name], (err, results) => {
        if(err) throw err;
        callback(results);
    });
}

exports.updateBoard = (board_name, callback) => {
    const query = 'UPDATE board SET board_name=? WHERE board_code=?';
    pool.query(query, [boardData.board_name, boardCode], (err, results) => {
        if(err) throw err;
        callback(results);
    });
}

exports.deleteBoard = (boardCode, callback) => {
    const query = 'DELETE FROM board WHERE board_code=?';
    pool.query(query, [boardCode], (err, results) => {
        if(err) throw err;
        callback(results);
    });
}


module.exports = exports;