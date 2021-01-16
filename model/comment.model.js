var mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        content: String,
        member: {type: mongoose.Schema.Types.ObjectId, ref: "Member"},
        series: {type: mongoose.Schema.Types.ObjectId, ref: "Series"},
        postedDate: Date,
    }
);

module.exports = mongoose.model('Comment', commentSchema, 'Comment');