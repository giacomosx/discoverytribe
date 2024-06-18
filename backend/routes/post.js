const express = require('express');
const post = express.Router();
const controller = require('../controllers/postController');
const { uploadMedia } = require('../utils/uploadMedia');
const sendEmail = require('../utils/sendEmail');

post.route('/:id').get(controller.getPostById)

post.route('/create').post(uploadMedia.single('media'), controller.cratePost, sendEmail.newPost)

post.route('/:id/edit').patch(controller.editPost)

post.route('/:id/media').patch(uploadMedia.single('media'), controller.changeMedia)

post.route('/:id/edit').patch(controller.editPost)

post.route('/:id/delete').delete(controller.deletePost)

post.route('/:id/like').patch(controller.likePost)

post.route('/:id/unlike').patch(controller.unlikePost)

module.exports = post