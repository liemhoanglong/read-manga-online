const express = require('express');
const router = express.Router();

const controllerSeries =require('../controllers/series.controller');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', controllerSeries.showSeries);
router.get('/series/:id', controllerSeries.showSeriesDetail);
router.get('/search', controllerSeries.searchSeries);
router.get('/genre/:id', controllerSeries.genreSeries);

module.exports = router;
