const express = require('express');
const user = express.Router();
const controller = require('../controllers/userControllers');


user.route('/me').get(controller.getCurrentUser)

user.route('/:id').get(controller.getUserById)


user.route('/:id').put((req, res) => {

})

user.route('/:id').delete((req, res) => {

})

user.route('/:id/follow').put((req, res) => {

})

user.route('/:id/unfollow').put((req, res) => {

})


module.exports = user
