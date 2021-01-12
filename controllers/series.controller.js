// const passport = require('passport');
// const bcrypt = require('bcryptjs');

const seriesServices = require('../services/series.services');
const handlebars= require('hbs');

handlebars.registerHelper("when",function(operand_1, operator, operand_2, options) {
  var operators = {
	  'eq': (l,r) => l == r,              							 //  {{/when}}
	  'noteq': (l,r) => l != r,
	  'gt': (l,r) => (+l) > (+r),                        // {{#when var1 'eq' var2}}
	  'gteq': (l,r) => ((+l) > (+r)) || (l == r),        //               eq
	  'lt': (l,r) => (+l) < (+r),                        // {{else when var1 'gt' var2}}
	  'lteq': (l,r) => ((+l) < (+r)) || (l == r),        //               gt
	  'or': (l,r) => l || r,                             // {{else}}
	  'and': (l,r) => l && r,                            //               lt
	  '%': (l,r) => (l % r) === 0                        // {{/when}}
  }
  , result = operators[operator](operand_1,operand_2);

  if (result) return options.fn(this);
  else  return options.inverse(this);
});

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

	let series = await(seriesServices.getAllSeries())
	
	let total = Math.ceil(series.length/limit);
	let listpage = []
	for (let i = 1; i <= total; i++) {
	   listpage.push(i);
	}
	// console.log(listpage);
	series = series.slice(startIndex, endIndex);

	res.render('home', {
		items: series,
		page,
		prepage,
		nextpage,
		total,
		listpage,
	});
};

module.exports.showSeriesDetail = async (req, res, next) => {
	let series = await(seriesServices.getSeries(req.query.id))
	res.render('series-detail', {
		series,
	});
};

module.exports.loadSeriesPosting = (req, res) => {
	res.render('series-posting');
}

module.exports.postSeries = (req, res) => {

	console.log(req.body);
  
	res.redirect('/users/series-posting');
}

module.exports.loadSeriesPosted = (req, res) => {
	res.render('series-posted');
}

module.exports.loadSeriesFollowing = (req, res) => {
	res.render('series-following');
}

module.exports.loadSeriesUpdate = (req, res) => {
	res.render('series-update');
}