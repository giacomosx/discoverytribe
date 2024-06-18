const Post = require("../models/Post");
const User = require("../models/User");

const cratePost = async  (req, res, next) => {

    if (!req.file) return res.status(400).json({message: 'No file uploaded'});

    try {
        const post = new Post({
            ...req.body,
            userId: req.user.userId,
            media: req.file.path
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

        if(!post) return res.status(400).send({message: "No post found"})

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

        if(!post) return res.status(400).send({message: "No post found"})

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

const likePost = async (req, res, next) => {
    const {id} = req.params

    try {
        if (!id) return res.status(400).send({message: "No id found"})

        const post = await Post.findById(id)

        if (post.likes.includes(req.user.userId)) {
            return res.status(401).send({message: "You already liked this post"})
        }

        if(!post) return res.status(400).send({message: "No post found"})

        const user = await User.findById(req.user.userId)
        user.liked_posts.push(post._id)
        user.save()

        post.likes.push(user._id)
        post.save()

        res.status(200).json({message: "Post successfully liked", post})

    } catch (e) {
        console.error(e)
        next({statusCode: 500, message: e.message});
    }

}

const unlikePost = async (req, res, next) => {
    const {id} = req.params

    try {
        if (!id) return res.status(400).send({message: "No id found"})

        const post = await Post.findById(id)

        if(!post) return res.status(400).send({message: "No post found"})

        const user = await User.findById(req.user.userId)

        user.liked_posts.pull(post._id)
        user.save()

        post.likes.pull(user._id)
        post.save()

        res.status(200).json({message: "Post successfully unliked", post})

    } catch (e) {
        console.error(e)
        next({statusCode: 500, message: e.message});
    }

}

const changeMedia = async (req, res, next) => {
    const {id} = req.params

    if (!req.file) return res.status(400).json({message: 'No file uploaded'});

    try {
        if (!id) return res.status(400).send({message: "No id found"})

        const post = await Post.findById(id)

        if (!post) return res.status(400).send({message: "No post found"})

        const editedPost = await Post.findByIdAndUpdate(id, {
            ...req.body,
            media: req.file.path
        }, {new: true})

        res.status(201).json(editedPost)
    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

module.exports = {
    cratePost,
    deletePost,
    editPost,
    getPostById,
    likePost,
    unlikePost,
    changeMedia
}