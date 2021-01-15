var mongoose = require('mongoose');

const reportCommentSchema = mongoose.Schema(
    {
        summary: String,
        comment: mongoose.Schema.Types.ObjectId,
        reportedBy: mongoose.Schema.Types.ObjectId,
        reportedDate: Date
    }
);

module.exports = mongoose.model('ReportComment', reportCommentSchema, 'ReportComment');