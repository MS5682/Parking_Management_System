// models/Post.js
const db = require('../db');

exports.createPost = (title, content, callback) => {
    const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    db.query(query, [title, content], callback);
};

exports.getAllPosts = callback => {
    const query = 'SELECT * FROM posts';
    db.query(query, callback);
};

exports.updatePost = (id, title, content, callback) => {
    const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    db.query(query, [title, content, id], callback);
};

exports.deletePost = (id, callback) => {
    const query = 'DELETE FROM posts WHERE id = ?';
    db.query(query, [id], callback);
};