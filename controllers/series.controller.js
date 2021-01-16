// const passport = require('passport');
// const bcrypt = require('bcryptjs');

const seriesServices = require('../services/series.services');
const commentServices = require('../services/comment.service');
const chapterServices = require('../services/chapter.service');

module.exports = {
	showSeries: async (req, res, next) => {
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

		let series = await (seriesServices.getAllSeries());
		if (req.query.sort){
			console.log(req.query.sort)
			if (req.query.sort == 1){
				series = series.sort((a,b) => (b.name.localeCompare(a.name) < 0) ? 1 : ((a.name.localeCompare(b.name) < 0) ? -1 : 0))
			}else if (req.query.sort == 2){
				series = series.sort((a,b) => (a.name.localeCompare(b.name) < 0) ? 1 : ((b.name.localeCompare(a.name) < 0) ? -1 : 0))
			}
		}

		let total = Math.ceil(series.length / limit);
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
	},

	showSeriesDetail: async (req, res, next) => {
		let series = await (seriesServices.getSeries(req.params.id));
		// let genres = await(genreServices.getAll());
		let chapters = await (chapterServices.getBySeriesID(req.params.id));
		// console.log(series)
		let comments = await (commentServices.getAllBySeries(req.params.id));
		// console.log(comments)

		res.render('series-detail', {
			series,
			// genres,
			chapters,
			comments,
		});
	},

	searchSeries: async (req, res, next) => {
		console.log(req.query.q)
		let series = await (seriesServices.getByName(req.query.q));

		res.render('search-series', {
			series,
			query: req.query.q,
		});
	},

	genreSeries: async (req, res, next) => {
		console.log(req.params.id)
		let series = await (seriesServices.getByGenre(req.params.id));
		let text = 'thuộc thể loại "' + series[0].genreList[0].name + '"';
		res.render('genre-series', {
			series,
			genre: text,
		});
	},

	authorSeries: async (req, res, next) => {
		console.log(req.params.name)
		let series = await (seriesServices.getByAuthor(req.params.name));
		let text = 'thuộc tác giả "' + req.params.name + '"';
		res.render('genre-series', {
			series,
			genre: text,
		});
	},

	comment: async (req, res, next) => {
		// console.log("-------------------------------------------------")
		// console.log(req.params.id);
		// console.log(req.user._id);
		// console.log(req.body.comment);
		seriesId = req.params.id;
		commentServices.create({
			content: req.body.comment,
			member: req.user._id,
			series: req.params.id,
			postedDate: Date.now()
		})
        res.redirect(`/series/${seriesId}`);
	},
	
}
