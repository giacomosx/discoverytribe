const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
        cover: {
            type: String,
            default:
                'http://placehold.it/600x400/',
        },
        avatar: {
            type: String,
            default:
                'http://placehold.it/200',
        },
        username: {
            type: String,
            required:
                true,
        },
        name: {
            type: String,
            required:
                false,
        },
        lastname: {
            type: String,
            required:
                false,
        },
        email: {
            type: String,
            required:
                true,
            unique:
                true,
        },
        password: {
            select: false,
            type: String,
            required:
                true,
            minlength:
                6,
        },
        hobbies: Array,
        description: String,
        birth_date: String,
        location: {
            location_formatted: String,
            location_name: String,
            location_city: String,
            location_state: String,
            location_country: String,
            location_zipcode: String,
            latitude: Number,
            longitude: Number,
            place_id: String,
        },
        verified: {
            type: Boolean,
            default:
                false,
        },
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