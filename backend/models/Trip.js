const mongoose = require('mongoose');

const Trip = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
        type: String,
        required: true,
    },
    destination: {
        destination_formatted: String,
        destination_name: String,
        destination_city: String,
        destination_state: String,
        destination_country: String,
        destination_zipcode: String,
        latitude: Number,
        longitude: Number,
        place_id: String
    },
    milestones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Milestone',
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    suggestions: [{
        authorId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        hidden: Boolean,
    }],
    budget: Number,
    type: {
        type: String,
        enum: ['relax', 'sport', 'job', 'family', 'honeymoon', 'adventure', 'shopping']
    },
    cover: String,
    public: {
        type: Boolean,
        default: true,
    },
    rel_posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }]
}, { timestamps: true , strict: true});

Trip.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Trip', Trip, 'trips');