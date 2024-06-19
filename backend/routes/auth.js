const express = require('express');
const auth = express.Router();
const controller = require('../controllers/authController');
const validate = require('../middlewares/validators/userValidator');
const {uploadAvatar} = require('../utils/uploadMedia');
const sendEmail = require('../utils/sendEmail');
const {verifyToken} = require('../middlewares/tokenController');

auth.post('/register', uploadAvatar.single('avatar'), validate.registerValidator, controller.register, sendEmail.newUser)
auth.post('/login', validate.loginValidator, controller.login)
auth.post('/invite', verifyToken, controller.inviteUser, sendEmail.inviteMail)


module.exports = auth;