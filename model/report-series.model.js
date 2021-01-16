var mongoose = require('mongoose');

const reportSeriesSchema = mongoose.Schema(
    {
        summary: String,
        series: {type: mongoose.Schema.Types.ObjectId, ref:"Series"},
        reportedBy: {type: mongoose.Schema.Types.ObjectId, ref:"Member"},
        reportedDate: Date
    }
);

module.exports = mongoose.model('ReportSeries', reportSeriesSchema, 'ReportSeries');