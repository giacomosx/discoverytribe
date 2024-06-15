const express = require('express');
const user = express.Router();
const controller = require('../controllers/userControllers');

user.route('/me').get(controller.getCurrentUser)

user.route('/me/edit').patch(controller.editUser)

user.route('/me/delete').delete(controller.deleteUser)

user.route('/me/followings').get(controller.getFollowings)

user.route('/me/followers').get(controller.getFollowers)

user.route('/:id/follow').patch(controller.followUser)

user.route('/:id/unfollow').patch(controller.unfollowUser)

user.route('/:id').get(controller.getUserById)


module.exports = user
