const express = require('express');
const auth = express.Router();
const controller = require('../controllers/authController');
const validate = require('../middlewares/validators/userValidator');
const { uploadAvatar } = require('../utils/uploadMedia');

auth.post('/register', uploadAvatar.single('avatar'), validate.registerValidator, controller.register)
auth.post('/login', validate.loginValidator, controller.login)

module.exports = auth;