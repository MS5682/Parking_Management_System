const Post = require('../models/Post');
const Board = require('../models/Board');
const Comment = require('../models/Comment');

exports.createPost = (req, res) => {
  const postData = {
    board_code: req.body.board_code,
    post_date: new Date().toISOString().slice(0, 19).replace('T', ' '),//수정일로 변경 필요
    title: req.body.title,
    post_contents: req.body.contents,
    view: 0,//수정바람
    file: req.body.file,
    id: req.body.id
  };
  
  Post.createPost(postData, (postCode) => {
    res.redirect(`/boards/${postData.board_code}/posts/${postCode}`);
  });
};

exports.getPosts = (req, res) => {
  const boardCode = req.params.boardCode;
  Post.getPostsByBoardCode(boardCode, (posts) => {
    res.render('post_list', {boardCode, posts });
  });
};

exports.getPost = (req, res) => {
  const postCode = req.params.postCode;
  const boardCode = req.params.boardCode;
  Post.getPostByPostCode(postCode, (post) => {
    Comment.getCommentsByPostCode(postCode, (comments) => {
      Board.getBoardbyBoardCode(boardCode, (board) => {
        console.log(post);
        res.render('post', {post, comments, board});
      });
    });
  });
};

exports.editPost = (req, res) => {
  const postCode = req.params.postCode;
  Post.getPostByPostCode(postCode, (post) => {
    res.render('edit_post', {post});
  });
};

exports.newPost = (req, res) => {
  const boardCode = req.params.boardCode;
  res.render('new_post', {boardCode});
};


exports.updatePost = (req, res) => {
  const postCode = req.params.postCode;
  const postData = {
    board_code: req.body.board_code,
    post_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    title: req.body.title,
    post_contents: req.body.post_contents,
    view: 0,//수정바람
    file: req.body.file,
    id: req.body.id
  };
  Post.updatePostByPostCode(postCode, postData, (result) => {
    res.status(200).json(result);
  });
};

exports.deletePost = (req, res) => {
  const postCode = req.params.postCode;
  Comment.deleteCommentsByPostCode(postCode, (result) => {
    Post.deletePostByPostCode(postCode, (result) => {
      res.status(200).json(result);
    });
  });
}

exports.createComment = (req, res) => {
  const commentData = {
    post_code: req.params.postCode,
    comment_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    comment_contents: req.body.comment,  // 수정된 부분
    id: req.body.id
  };
  Comment.createComment(commentData, (result) => {
    res.status(201).json(result);
  });
}

exports.deleteComment = (req, res) => {
  const commentCode = req.params.commentCode;
  Comment.deleteCommentByCommentCode(commentCode, (result) => {
    res.status(200).json(result);
  });
}

exports.updateComment = (req, res) => {
  const commentCode = req.params.commentCode;
  const commentData = {
    comment_contents: req.body.comment
  };
  Comment.updateCommentByCommentCode(commentCode, commentData, (result) => {
    res.status(200).json(result);
  });
}