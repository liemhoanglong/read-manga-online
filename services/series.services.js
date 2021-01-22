var series = require('../model/series.model');
var reportSeries = require('../model/report-series.model');
var member = require('../model/member.model');
const { now } = require('mongoose');

module.exports= {
	getAllSeries: async() => {
		let res = await series.find();
		// console.log(res)
		return res
	},

	getAllSeriesValidated: async() => {
		//get all series validated
		let res = await series.find({status: 1});
		// res.forEach(element => {
		// 	console.log(element.name)
		// });
		return res
	},

	getSeries: async(id) => {
		//get series validated
		let res = await series.findById(id).populate("genreList");
		// let res = await series.findById(id);
		// console.log(res)
		return res
	},

	// Begin of Nguyen Manh Linh's works==========================================================
	createSeries: (name, author, postedBy, genreList, summary, thumbnail) => {
		const newSeries = new series({
			name: name,
			author: author,
			postedDate: new Date(),
			postedBy: postedBy,
			genreList: genreList,
			status: -1,
			like: 0,
			view: 0,
			rate: 7,
			summary: summary,
			thumbnail: thumbnail
		});

		newSeries.save();
	},

	followSeries: async(id, userId) => {
		let tempMember = await member.findById(userId);
		let temp;
		for (let i = 0; i < tempMember.favoriteSeries.length; i++) {
			temp = tempMember.favoriteSeries[i].toString();
			// console.log("id follow " + temp);
			if(temp.localeCompare(id) === 0){
				// console.log("bị trùng nha " + temp.localeCompare(id));
				return;
			}
		}
		tempMember.favoriteSeries.push(id);
		tempMember.save();
	},

	likeSeries: async(id) => {
		let tempSeries = await series.findById(id);
		++tempSeries.like;
		tempSeries.save();
	},

	viewSeries: async(id) => {
		let tempSeries = await series.findById(id);
		// console.log("series ne-------------- " + tempSeries);
		++tempSeries.view;
		tempSeries.save();
	},
	
	reportSeries: async(id, userId) => {
		const newReportSeries = new reportSeries({
			summary	: "Hình bị mất",
			reportedBy: userId,
			reportedDate: new Date(),
			series: id,
		});
		newReportSeries.save();
	},

	getSeriesPostedByMember: async memberID => {
		const result = await series.find({ postedBy: memberID });
		return result;
	},
	updateSeries: async (id, name, author, genreList, summary, thumbnail) => {
		const seriesUpdated = await series.findOne({ _id: id });

		console.log(seriesUpdated);

		seriesUpdated.name = name;
		seriesUpdated.author = author;
		seriesUpdated.genreList = genreList;
		seriesUpdated.summary = summary;
		seriesUpdated.thumbnail = thumbnail;

		seriesUpdated.save();
	},
	// End of Nguyen Manh Linh's works============================================================
	
	getByName: async (name) => {
		const regex = new RegExp(escapeRegex(name), 'gi');
		let res = await series.find({ name: regex});
		return res
	},

	getByGenre: async (genre) => {
		let res = await series.find().populate({ path: "genreList", match: { _id: genre } });
		res = res.filter((item => item.genreList.length > 0))
		return res
	},

	getByAuthor: async (author) => {
		const regex = new RegExp(escapeRegex(author), 'gi');
		let res = await series.find({author: regex});
		console.log(res)
		return res
	},
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

