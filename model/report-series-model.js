var mongoose = require('mongoose');

const reportSeriesSchema = mongoose.Schema(
    {
        summary: String,
        series: mongoose.Schema.Types.ObjectId,
        reportedBy: mongoose.Schema.Types.ObjectId,
        reportedDate: Date
    }
);

module.exports = mongoose.model('ReportSeries', reportSeriesSchema, 'ReportSeries');