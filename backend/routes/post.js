const express = require('express');
const post = express.Router();
const controller = require('../controllers/postController');

post.route('/create').post(controller.cratePost)

post.route('/:id/delete').delete(controller.deletePost)

post.route('/:id/edit').patch(controller.editPost)

post.route('/:id').get(controller.getPostById)

module.exports = post