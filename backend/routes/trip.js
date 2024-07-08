const express = require('express');
const trip = express.Router();
const controller = require('../controllers/tripController');
const {uploadCover} = require('../utils/uploadMedia');
const sendEmail = require('../utils/sendEmail');

trip.route('/').get(controller.getAllTrips)

trip.route('/most-liked').get(controller.getMostLikedTrips)

trip.route('/:id').get(controller.getTripById)

trip.route('/create').post(controller.createTrip, sendEmail.newTrip)

trip.route('/:id/edit').patch(controller.editTrip)

trip.route('/:id/cover').patch(uploadCover.single('cover'), controller.changeCover)

trip.route('/:id/delete').delete(controller.deleteTrip)

trip.route('/:id/like').patch(controller.likeTrip)

trip.route('/:id/unlike').patch(controller.unlikeTrip)

module.exports = trip;