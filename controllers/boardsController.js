const Post = require('../models/Post');
const Board = require('../models/Board');
const Comment = require('../models/Comment');
exports.getBoards = (req, res) => {
    Board.getBoards((boards) => {
        res.render('board_list', { boards });
    });
};


exports.getBoardByBoardCode = (req, res) => {
    const boardCode = req.params.board_code;
    Board.getBoardbyBoardCode(boardCode, (results) => {
        res.status(200).json(results);
    });
}



exports.getBoardByName = (req, res) => {
    const boardName = req.params.board_name;
    Board.getBoardByName(boardName, (results) => {
        res.status(200).json(results);
    });
}

exports.deleteBoard = (req, res) => {
    const boardCode = req.params.boardCode;
    Board.deleteBoardByBoardCode(boardCode, (result) => {
        res.status(200).json(result);
    });
}