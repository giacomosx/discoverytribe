const mongoose = require('mongoose')

const Post = mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            rel: 'User',
        },
        title: String,
        content: String,
        cover: {
            type: String,
            required: true,
            default: 'http://placehold.it/600x400/',
        },
        tags: Array,
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            rel: 'Trip'
        },
        comments: [{
            authorId: {
                type: mongoose.Schema.Types.ObjectId,
                rel: 'User'
            },
            content: String,
            hidden: {
                type: Boolean,
                default: false
            }
        }],
        likes: {
            type: mongoose.Schema.Types.ObjectId,
            rel: 'User'
        },
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
