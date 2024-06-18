const express = require('express');
const feed = express.Router();
const controller = require('../controllers/feedController');

feed.route('/').get(controller.getUserFeed)

module.exports = feed