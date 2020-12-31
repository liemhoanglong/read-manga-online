var series = require('../model/series.model');

module.exports= {
	getAllSeries: () => {
		return series.find();
	}
}


