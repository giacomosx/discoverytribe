const User = require('../models/User');
const Milestone = require('../models/Milestone');

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

        if (user.followings.includes(req.params.id)) {
            return res.status(401).send({message: "You already follow this user"})
        }

        const userToFollow = await User.findById(req.params.id)

        if(!userToFollow) return res.status(401).json({message:"Invalid user Id"})

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

        if(!userToUnfollow) return res.status(401).json({message:"Invalid user Id"})

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
        const user = await User.findById(req.user.userId).populate({path: 'followings', select: 'username avatar name lastname'}).select('followings')
        res.status(200).json(user)

    } catch (e) {
        next({statusCode: 500, message: e.message});
    }
}

const getFollowers = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).populate({path: 'followers', select: 'username avatar name lastname'}).select('followers')
        res.status(200).json(user)

    } catch (e) {
        next({statusCode: 500, message: e.message});
    }
}

const getFollowersById = async (req, res, next) => {
    const {id} = req.params
    try {
        const user = await User.findById(id).populate({path: 'followers', select: 'username avatar name lastname'}).select('followers')
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
        next({statusCode: 400, message: e.message});
    }
}

const editUser = async (req, res, next) => {
    try {
        const editedUser = await User.findByIdAndUpdate(req.user.userId, {
            ...req.body
        }, {new: true})

        res.status(200).json({message:"Successfully edited user", editedUser})
    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

const getUserTrips = async (req, res, next) => {
    const {id} = req.params
    try {
        const user = await User.findById(id).populate({
            path: 'trips',
            options: { sort: { createdAt: -1 } }
        }).select('trips')

        if (!user) return res.status.status(404).send({message: "No user found with this id"})

        res.status(200).json(user)

    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

const getUserPosts = async (req, res, next) => {
    const {id} = req.params
    try {
        const user = await User.findById(id).populate({
            path: 'posts',
            options: { sort: { createdAt: -1 } }
        }).select('posts')

        if (!user) return res.status.status(404).send({message: "No user found with this id"})

        res.status(200).json(user)
    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

const getLikedPosts = async (req, res, next) => {
    const {id} = req.params
    try {
        const user = await User.findById(id).populate({
            path: 'liked_posts',
            options: { sort: { createdAt: -1 } }
        }).select('liked_posts')

        if (!user) return res.status.status(404).send({message: "No user found with this id"})

        res.status(200).json(user)
    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

const getLikedTrips = async (req, res, next) => {
    const {id} = req.params
    try {
        const user = await User.findById(id).populate({
            path: 'liked_trips',
            options: { sort: { createdAt: -1 } }
        }).select('liked_trips')

        if (!user) return res.status.status(404).send({message: "No user found with this id"})

        res.status(200).json(user)
    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

const changeAvatar = async (req, res, next) => {
    if (!req.file) return res.status(400).json({message: 'No file uploaded'});
    try {
        const editedUser = await User.findByIdAndUpdate(req.user.userId, {
            ...req.body,
            avatar: req.file.path
        }, {new: true})

        res.status(201).json({message: 'Avatar successfully changed', editedUser})
    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}


const changeCover = async (req, res, next) => {
    if (!req.file) return res.status(400).json({message: 'No file uploaded'});
    try {
        const editedUser = await User.findByIdAndUpdate(req.user.userId, {
            ...req.body,
            cover: req.file.path
        }, {new: true})

        res.status(201).json({message: 'Cover successfully changed', editedUser})
    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

const getUserStats = async (req, res, next) => {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).send({message: "No user found with this id"})
        const milestones = await Milestone.find({userId : id}).countDocuments()

        res.status(200).json({
            milestones: milestones,
            user
        })
    } catch (e) {
        next({statusCode: 400, message: e.message});
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
    editUser,
    getUserTrips,
    getUserPosts,
    changeAvatar,
    changeCover,
    getLikedPosts,
    getLikedTrips,
    getUserStats,
    getFollowersById,
}