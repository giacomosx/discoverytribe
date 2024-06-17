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
        destination_name: {
            type: String,
            required: true,
        },
        latitude: Number,
        longitude: Number,
        place_id: String
    },
    milestones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Milestone',
    }],
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
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
    cover: {
        type: String,
        default: 'http://placehold.it/600x400/',
    },
    public: {
        type: Boolean,
        default: false,
    },
    rel_posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }]
}, { timestamps: true , strict: true});

Trip.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Trip', Trip, 'trips');