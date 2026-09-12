const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    content:{
        type: String,
        ref: 'User',
        required: true,
        minlength: 20
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status:{
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    views: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ['Technology', 'General', 'Housing'],
        default: 'Technology'
    }
}, 
{timestamps: true}
);
BlogSchema.index({title: 'text', content: 'text', status: 'text', category: 'text'})
const BlogModel = mongoose.model('Blog', BlogSchema)

module.exports = BlogModel;