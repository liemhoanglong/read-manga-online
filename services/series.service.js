var series = require('../model/series.model');

module.exports = {
	getAllSeries: async () => {
		let res = await series.find();
		// console.log(res)
		return res
	},

	getSeries: async (id) => {
		let res = await series.findById(id).populate("genreList");
		// console.log(res)
		return res
	},

	getByName: async (name) => {
		const regex = new RegExp(escapeRegex(name), 'gi');
		let res = await series.find({ "name": regex});
		// let res = await series.find({ "name": { $regex: '.*' + name + '.*' } },
		// 	function (err, data) {
		// 		console.log('data', data);
		// 	}
		// );
		console.log(res)
		return res
	},

	getByGenre: async (genre) => {
		let res = await series.find().populate({ path: "genreList", match: { _id: genre } });
		res = res.filter((item => item.genreList.length > 0))
		console.log(res)
		return res
	},
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
