var mongoose = require('mongoose');

// tạo Schema
var seriesSchema = new mongoose.Schema({
	name: String,
	author: String,
	postedDate: Date,
	postedBy: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Member"
	}],
	genreList: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Genre"
	}],
	like: Number,
	view: Number,
	rate: Number,
	status: Number,
	summary: String,
	thumbnail: String
}, { collection: 'Series' });
//tạo model

module.exports = mongoose.model('Series', seriesSchema, 'Series');