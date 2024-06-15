const {validationResult, checkSchema } = require('express-validator');

const registerValidator = async (req, res, next) => {
    try {
        await checkSchema({
            avatar: {
                trim: true,
                isString: true,
                errorMessage: 'Insert a valid string',
            },
            username: {
                trim: true,
                isString: true,
                notEmpty: true,
                errorMessage: 'Insert a valid username',
            },
            name: {
                trim: true,
                isString: true,
                errorMessage: 'Insert a valid name',
            },
            lastname: {
                trim: true,
                isString: true,
                errorMessage: 'Insert a valid lastname',
            },
            email: {
                trim: true,
                notEmpty: true,
                isEmail: true,
                errorMessage: 'Insert a valid email',
            },
            password: {
                trim: true,
                notEmpty: true,
                isAlphanumeric: true,
                isLength:{
                    options: { min: 8}
                },
                errorMessage: 'Insert a valid password',
            },
        }).run(req);
        const errors = await validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        } else {
            next()
        }

    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

const loginValidator = async (req, res, next) => {
    try {
        await checkSchema({
            email: {
                trim: true,
                notEmpty: true,
                isEmail: true,
                errorMessage: 'Insert a valid email',
            },
            password: {
                trim: true,
                notEmpty: true,
                isAlphanumeric: true,
                isLength:{
                    options: { min: 8}
                },
                errorMessage: 'Insert a valid password',
            },
        }).run(req);
        const errors = await validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        } else {
            next();
        }

    } catch (e) {
        next({statusCode: 400, message: e.message});
    }
}

module.exports = {
    registerValidator,
    loginValidator,
};