const pool = require('../db');

//처음에 게시판을 불러올 때 사용
exports.getBoards = (callback) => {
    const query = 'SELECT * FROM board';
    pool.query(query, (err, results) => {
        if(err) throw err;
        callback(results);
    });
};
//특정 게시판으로 이동
exports.getBoardbyName = (board_name, callback) => {
    const query = 'SELECT * FROM board WHERE board_name =?';
    pool.query(query, [board_name], (err, results) => {
        if(err) throw err;
        callback(results);
    });
};
//특정 게시판으로 이동
exports.getBoardbyBoardCode = (boardCode, callback) => {
    const query = 'SELECT * FROM board WHERE board_code =?';
    pool.query(query, [boardCode], (err, results) => {
        if(err) throw err;
        callback(results);
    });
};
//수정해야함
exports.createBoardByBoardData = (board_name, callback) => {
    const query = 'INSERT INTO board (board_name) VALUES (?)';
    pool.query(query, [board_name], (err, results) => {
        if(err) throw err;
        callback(results);
    });
}
exports.updateBoardByBoardData = (boardData, callback) => {
    const query = 'UPDATE board SET board_name=? WHERE board_code=?';
    pool.query(query, [boardData.board_name, boardData.board_code], (err, results) => {
        if(err) throw err;
        callback(results);
    });
}
exports.deleteBoardByBoardCode = (boardCode, callback) => {
    const query = 'DELETE FROM board WHERE board_code=?';
    pool.query(query, [boardCode], (err, results) => {
        if(err) throw err;
        callback(results);
    });
}


module.exports = exports;