const express = require('express');
const trip = express.Router();
const Trip = require('../models/Trip');
const User = require('../models/User');

trip.route('/create').post(async (req, res, next) => {
    try {
        const trip = new Trip({
            ...req.body,
            userId: req.user.userId,
        });
        const relUser = await User.findById(req.user.userId)
        await trip.save()
        relUser.trips.push(trip._id)
        await relUser.save()
        res.status(201).json({message:"Successfully created trip", trip})
    } catch (e) {
        console.log(e)
        next({statusCode: 500, message: e.message});
    }
})

module.exports = trip;