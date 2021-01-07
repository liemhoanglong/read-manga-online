const express = require('express');
const router = express.Router();

const controllerSeries =require('../controllers/series.controller');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', controllerSeries.showSeries);
router.get('/series', controllerSeries.showSeriesDetail);

module.exports = router;
