const Board = require('../models/Board');

exports.createBoard = (req, res) => {
    const boardData = req.body;
    Board.createBoard(boardData, (result) => {
        res.status(201).json(result);
    });
    }

exports.getBoards = (req, res) => {
    Board.getBoards((boards) => {
        res.render('boards', { boards });
    });
};

exports.getBoardByName = (req, res) => {
    const board_name = req.params.board_name;
    Board.getBoardByName(board_name, (results) => {
        res.status(200).json(results);
    });
    }


exports.updateBoard = (req, res) => {
    const board_name = req.params.board_name;
    const boardData = req.body;
    Board.updateBoard(board_name, boardData, (result) => {
        res.status(200).json(result);
    });
    }

exports.deleteBoard = (req, res) => {
    const board_name = req.params.board_name;
    Board.deleteBoard(board_name, (result) => {
        res.status(200).json(result);
    });
    }

exports.getBoardById = (req, res) => {
    const board_code = req.params.board_code;
    Board.getBoardById(board_code, (results) => {
        res.status(200).json(results);
    });
}
