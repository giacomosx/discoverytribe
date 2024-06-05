const express = require('express');
const user = express.Router();

user.route('/me').get((req, res) => {

})

user.route('/:id').get((req, res) => {

})

user.route('/').post((req, res) => {

})

user.route('/:id').put((req, res) => {

})

user.route('/:id').delete((req, res) => {

})

user.route('/:id/follow').put((req, res) => {

})

user.route('/:id/unfollow').put((req, res) => {

})


module.exports = user
