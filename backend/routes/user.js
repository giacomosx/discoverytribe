const express = require('express');
const user = express.Router();
const controller = require('../controllers/userControllers');
const { uploadAvatar, uploadCover } = require('../utils/uploadMedia');

user.route('/me').get(controller.getCurrentUser)

user.route('/me/edit').patch(controller.editUser)

user.route('/me/delete').delete(controller.deleteUser)

user.route('/me/followings').get(controller.getFollowings)

user.route('/me/followers').get(controller.getFollowers)

user.route('/me/avatar').patch(uploadAvatar.single('avatar'), controller.changeAvatar)

user.route('/me/cover').patch(uploadCover.single('cover'), controller.changeCover)

user.route('/:id/trips').get(controller.getUserTrips)

user.route('/:id/posts').get(controller.getUserPosts)

user.route('/:id/liked-posts').get(controller.getLikedPosts)

user.route('/:id/liked-trips').get(controller.getLikedTrips)

user.route('/:id/follow').patch(controller.followUser)

user.route('/:id/unfollow').patch(controller.unfollowUser)

user.route('/:id').get(controller.getUserById)

user.route('/followers/:id').get(controller.getFollowersById)

user.route('/stats/:id').get(controller.getUserStats)


module.exports = user
