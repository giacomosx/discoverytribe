const mongoose = require('mongoose')

const Post = mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        title: String,
        content: String,
        media: {
            type: String
        },
        tags: Array,
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip'
        },
        comments: [{
            authorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            content: String,
            hidden: {
                type: Boolean,
                default: false
            }
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        public: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        strict: true
    }
)

Post.index({userId: 1, createdAt: -1, updatedAt: 1})

module.exports = mongoose.model('Post', Post, 'posts');
