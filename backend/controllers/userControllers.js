const User = require('../models/User');

const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)

        if (!user) return res.status(401).json({message:"Invalid user Id"});

        res.status(200).json(user)
    } catch (e) {
        next({statusCode: 500, message: e.message});
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) return res.status(401).json({message:"Invalid user Id"});

        res.status(200).json(user)
    } catch (e) {
        next({statusCode: 500, message: e.message});
    }
}

const followUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        const userToFollow = await User.findById(req.params.id)

        user.followings.push(req.params.id);
        userToFollow.followers.push(user._id);

        user.save()
        userToFollow.save()

        res.status(201).json({message:"Successfully following user"})
    } catch (e) {
        next({statusCode: 500, message: e.message});
    }
}

const unfollowUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        const userToUnfollow = await User.findById(req.params.id)

        user.followings.pull(req.params.id);
        userToUnfollow.followers.pull(user._id);

        user.save()
        userToUnfollow.save()

        res.status(201).json({message: "Successfully unfollowing user"})
    } catch (e) {
        next({statusCode: 500, message: e.message});
    }
}

const getFollowings = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).populate('followings').select('followings')
        res.status(200).json(user)

    } catch (e) {
        next({statusCode: 500, message: e.message});
    }
}

const getFollowers = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).populate('followers').select('followers')
        res.status(200).json(user)

    } catch (e) {
        next({statusCode: 500, message: e.message});
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.user.userId)

        res.status(200).json({message:"Successfully deleted user", user})

    } catch (e) {
        next({statusCode: 500, message: e.message});
    }
}

const editUser = async (req, res, next) => {
    try {
        const editedUser = await User.findByIdAndUpdate(req.user.userId, {
            ...req.body
        }, {new: true})

        res.status(200).json({message:"Successfully edited user", editedUser})
    } catch (e) {

        res.status(400).json({message: e.message});
    }
}

module.exports = {
    getCurrentUser,
    getUserById,
    followUser,
    getFollowings,
    getFollowers,
    unfollowUser,
    deleteUser,
    editUser
}