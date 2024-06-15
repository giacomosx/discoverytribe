const User = require('../models/User');

const getCurrentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)

        if (!user) return res.status(401).json({message:"Invalid user Id"});

        res.status(200).json(user)
    } catch (e) {
        next(e);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) return res.status(401).json({message:"Invalid user Id"});

        res.status(200).json(user)
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getCurrentUser,
    getUserById
}