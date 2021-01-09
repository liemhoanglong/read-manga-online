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
}

