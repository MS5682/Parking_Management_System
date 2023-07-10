const Post = require('../models/Post');
const Board = require('../models/Board');
const Comment = require('../models/Comment');

exports.createPost = (req, res) => {
  const postData = req.body;
  Post.createPost(postData, (result) => {
    res.status(201).json(result);
  });
};

exports.getPosts = (req, res) => {
  const boardCode = req.params.board_code;
  Post.getPostsByBoard(boardCode, (posts) => {
    Board.getBoardbyId(boardCode, (boards) => {
      res.render('posts', { posts: posts, boards: boards });
    });
  });
};

exports.getPostById = (req, res) => {
  const post_code = req.params.post_code;
  Post.getPostById(post_code, (post) => {
    Comment.getCommentsByPost(post_code, (comments) => {
      res.render('post', { post: post , comments: comments});
  });
});
};

exports.updatePost = (req, res) => {
  const postCode = req.params.postCode;
  const postData = req.body;
  Post.updatePost(postCode, postData, (result) => {
    res.status(200).json(result);
  });
};

exports.deletePost = (req, res) => {
  const postCode = req.params.postCode;
  Post.deletePost(postCode, (result) => {
    res.status(200).json(result);
  });
};