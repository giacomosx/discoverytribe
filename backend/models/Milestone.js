const mongoose = require('mongoose');

const Milestone = new mongoose.Schema({
    rel_trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    description: {
        type: String,
        required: true,
    },
    image: String,
    destination: {
        destination_name: {
            type: String,
            required: true,
        },
        latitude: Number,
        longitude: Number,
        place_id: String
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    start_time: String,
    end_time: String,
    review: {
        type: String,
    },
    vote: {
        type: Number,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
    public: {
        type: Boolean,
        default: false,
    }

},
    {timestamps: true, strict: true}
);

module.exports = mongoose.model('Milestone', Milestone, 'milestones');
