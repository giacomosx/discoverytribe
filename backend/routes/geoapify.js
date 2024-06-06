const express = require('express');
const geoApi = express.Router();
const controller = require('../controllers/geoapifyController');


geoApi.route('/search',).get(controller.getPlacesByText)

geoApi.route('/placeId').get(controller.getPlaceById)

module.exports = geoApi