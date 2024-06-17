const Post = require("../models/Post");
const User = require("../models/User");
const Trip = require("../models/Trip");

const cratePost = async  (req, res, next) => {
    try {
        const post = new Post({
            ...req.body,
            userId: req.user.userId
        });
        const relUser = await User.findById(req.user.userId)
        await post.save()
        relUser.posts.push(post._id);
        await relUser.save()
        res.status(201).json({message: "Successfully created post", post})
    } catch (e) {
        console.log(e)
        next({statusCode: 400, message: e.message});
    }
}

const deletePost = async (req, res, next) => {
    const {id} = req.params

    try {
        if (!id) return res.status(400).send({message: "No id found"})

        const post = await Post.findById(id)

        if (String(post.userId) !== req.user.userId) return res.status(401).json({message: "Unauthorized to delete"})

        const relUser = await User.findById(req.user.userId)
        relUser.posts.pull(post._id);
        await relUser.save()

        const deletedPost = await Post.findByIdAndDelete(id)

        res.status(200).json({message: "Successfully deleted post", deletedPost})
    } catch (e) {
        console.error(e)
        next({statusCode: 400, message: e.message});
    }
}

const editPost = async (req, res, next) => {
    const {id} = req.params

    try {
        if (!id) return res.status(400).send({message: "No id found"})

        const post = await Post.findById(id)

        if (String(post.userId) !== req.user.userId) return res.status(401).json({message: "Unauthorized to edit"})

        const editedPost = await Post.findByIdAndUpdate(id, req.body, {new: true})

        res.status(200).json({message: "Successfully edited post", editedPost})

    } catch (e) {
        console.error(e)
        next({statusCode: 400, message: e.message});
    }
}

const getPostById = async (req, res, next) => {
    const {id} = req.params

    try {
        if (!id) return res.status(400).send({message: "No id found"})

        const post = await Post.findById(id).populate('userId')

        if(!post) return res.status(400).send({message: "No post found"})

        res.status(200).json(post)

    } catch (e) {
        console.error(e)
        next({statusCode: 500, message: e.message});
    }
}

module.exports = {
    cratePost,
    deletePost,
    editPost,
    getPostById
}