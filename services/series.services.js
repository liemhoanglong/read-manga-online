var series = require('../model/series.model');

module.exports= {
	getAllSeries: async() => {
		let res = await series.find();
		console.log(res)
		return res
	},

	getSeries: async(id) => {
		let res = await series.findById(id);
		console.log(res)
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
			summary: summary,
			thumbnail: thumbnail
		});

		newSeries.save();
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
	}
	// End of Nguyen Manh Linh's works============================================================
}

