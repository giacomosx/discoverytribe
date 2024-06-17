const express = require('express');
const post = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

post.route('/create').post(async (req, res, next) => {
    try {
        const newPost = new Post({
            ...req.body,
            userId: req.user.userId
        });
        const relUser = await User.findById(req.user.userId)
        await newPost.save()
        relUser.posts.push(newPost._id);
        await relUser.save()
        res.status(201).json({message: "Successfully created post", newPost})
    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
})

module.exports = post