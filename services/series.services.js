var series = require('../model/series.model');

module.exports= {
	getAllSeries: async() => {
		//get all series validated
		let res = await series.find({status: 1});
		// console.log(res)
		return res
	},

	getSeries: async(id) => {
		//get series validated
		let res = await series.findOne({$and:[{_id: id}, {status: 1}]}).populate("genreList");
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
		// console.log(res)
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

