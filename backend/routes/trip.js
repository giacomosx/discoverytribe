const express = require('express');
const trip = express.Router();
const controller = require('../controllers/tripController');

trip.route('/:id').get(controller.getTripById)

trip.route('/create').post(controller.createTrip)

trip.route('/:id/edit').patch(controller.editTrip)

trip.route('/:id/delete').delete(controller.deleteTrip)

trip.route('/:id/like').patch(controller.likeTrip)

trip.route('/:id/unlike').patch(controller.unlikeTrip)

module.exports = trip;