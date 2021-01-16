var mongoose = require('mongoose');

const reportCommentSchema = mongoose.Schema(
    {
        summary: String,
        comment: {type: mongoose.Schema.Types.ObjectId, ref: "Comment"},
        reportedBy: {type: mongoose.Schema.Types.ObjectId, ref:"Member"},
        reportedDate: Date
    }
);

module.exports = mongoose.model('ReportComment', reportCommentSchema, 'ReportComment');