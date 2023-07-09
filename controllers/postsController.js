// controllers/postsController.js
const Post = require('../models/Post');

exports.createPost = (req, res) => {
    const { title, content } = req.body;

    Post.createPost(title, content, (error, result) => {
        if (error) return res.status(500).send(error);
        res.status(201).json({ id: result.insertId, title, content });
    });
};

exports.getAllPosts = (req, res) => {
    Post.getAllPosts((error, results) => {
        if (error) return res.status(500).send(error);
        res.render('posts/index', { posts: results });
    });
};

exports.newPost = (req, res) => {
    res.render('posts/new');
};

exports.updatePost = (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    Post.updatePost(id, title, content, error => {
        if (error) return res.status(500).send(error);
        res.status(200).json({ id, title, content });
    });
};

exports.deletePost = (req, res) => {
    const { id } = req.params;

    Post.deletePost(id, error => {
        if (error) return res.status(500).send(error);
        res.status(200).json({ id });
    });
};