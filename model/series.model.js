var mongoose = require('mongoose');

const seriesSchema = mongoose.Schema(
    {
        name: String,
        author: String,
        postedDate: Date,
        postedBy: mongoose.Schema.Types.ObjectId,
        genreList: [mongoose.Schema.Types.ObjectId],
        status: Number,
        summary: String,
        thumbnail: String
    }
);

module.exports = mongoose.model('Series', seriesSchema, 'Series');