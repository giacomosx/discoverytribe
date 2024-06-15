const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default:
            'http://placehold.it/200',
    }
    ,
    username: {
        type: String,
        required:
            true,
    }
    ,
    name: {
        type: String,
        required:
            false,
    }
    ,
    lastname: {
        type: String,
        required:
            false,
    }
    ,
    email: {
        type: String,
        required:
            true,
        unique:
            true,
    }
    ,
    password: {
        type: String,
        required:
            true,
        minlength:
            6,
    }
    ,
    hobbies: [{
        type: String,
    }],
    description:
        {
            type: String,
        }
    ,
    birth_date: {
        type: String,
    }
    ,
    location: {
        city: {
            type: String,
        }
        ,
        country: {
            type: String,
        }
        ,
        zip_code: {
            type: String,
        }
        ,
        lat: {
            type: Number,
        }
        ,
        lon: {
            type: Number,
        }
        ,
    }
    ,
    verified: {
        type: Boolean,
        default:
            false,
    }
    ,
    cover: {
        type: String,
        default:
            'http://placehold.it/600x400/',
    }
    ,
    role: {
        type: String,
        default: 'user',
    },
    banned:
        {
            type: Boolean,
            default: false,
        },
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
    }],
    posts:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }],
    followers:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    followings:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    liked_trips:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip',
        }],
    liked_posts:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }],
},
    {timestamps: true, strict: true},
)

module.exports = mongoose.model('User', UserSchema, 'users');