var series = require('../model/series.model');

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
			summary: summary,
			thumbnail: thumbnail
		});

		newSeries.save();
	},
	getSeriesPostedByMember: async memberID => {
		const result = await series.find({ postedBy: memberID });
		return result;
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

