var mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        content: String,
        member: mongoose.Schema.Types.ObjectId,
        series: mongoose.Schema.Types.ObjectId
    }
);

module.exports = mongoose.model('Comment', commentSchema, 'Comment');