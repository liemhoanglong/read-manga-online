// const passport = require('passport');
// const bcrypt = require('bcryptjs');

const seriesServices = require('../services/series.service');
const genreServices = require('../services/genre.service');
const chapterServices = require('../services/chapter.service');

module.exports.showSeries = async (req, res, next) => {
	const limit = 8;
	let page = Number(1);
	if (req.query.page) {
		page = req.query.page;
	} else {
		page = 1;
	}
	let prepage = --page;
	++page
	let nextpage = ++page;
	--page
	//console.log(page);
	let startIndex = (page - 1) * limit;  
	let endIndex = page * limit;

	let series = await(seriesServices.getAllSeries());
	
	let total = Math.ceil(series.length/limit);
	let listpage = []
	for (let i = 1; i <= total; i++) {
	   listpage.push(i);
	}
	// console.log(listpage);
	series = series.slice(startIndex, endIndex);

	res.render('home', {
		series,
		page,
		prepage,
		nextpage,
		total,
		listpage,
	});
};

module.exports.showSeriesDetail = async (req, res, next) => {
	let series = await(seriesServices.getSeries(req.params.id));
	// let genres = await(genreServices.getAll());
	let chapters = await(chapterServices.getBySeriesID(req.params.id));
	// console.log(series)

	res.render('series-detail', {
		series,
		// genres,
		chapters,
	});
};

module.exports.searchSeries = async (req, res, next) => {
	console.log(req.query.q)
	let series = await(seriesServices.getByName(req.query.q));

	res.render('search-series', {
		series,
		query: req.query.q,
	});
}

module.exports.genreSeries = async (req, res, next) => {
	console.log(req.params.id)
	let series = await(seriesServices.getByGenre(req.params.id));
	
	res.render('genre-series', {
		series,
		genre: series[0].genreList[0].name,
	});
}
