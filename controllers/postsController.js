const Post = require('../models/Post');

exports.createPost = (req, res) => {
  const postData = req.body;
  Post.createPost(postData, (result) => {
    res.status(201).json(result);
  });
};

exports.getPosts = (req, res) => {
    Post.getPosts((results) => {
    res.status(200).json(results);
  });
};

exports.getPostById = (req, res) => {
  const postCode = req.params.postCode;
  Post.getPostById(postCode, (results) => {
    res.status(200).json(results);
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