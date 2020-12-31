// const passport = require('passport');
// const bcrypt = require('bcryptjs');

const seriesServices = require('../services/series.services');

module.exports.showSeries = async (req, res, next) => {
	// const[category, publisher, product] = 
	// await Promise.all([
	// 	categories.getAllCategories(),
	// 	publishers.getAllPublisher(),
	// 	products.getAllProduct()
	// 	]);
	// res.render('products', {categories: category, publish: publisher, items: product, title : 'Danh sách sản phẩm'});
	const series = await(seriesServices.getAllSeries())
	console.log(series)
	res.render('home', {series: series});
};

