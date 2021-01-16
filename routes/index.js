const express = require('express');
const router = express.Router();

const controllerSeries = require('../controllers/series.controller');
const { authLogin } = require("../middlewares/auth.mdw.js");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', controllerSeries.showSeries);
router.get('/series/:id', controllerSeries.showSeriesDetail);
router.get('/search', controllerSeries.searchSeries);
router.get('/genre/:id', controllerSeries.genreSeries);
router.get('/author/:name', controllerSeries.authorSeries);

router.post('/comment/:id', authLogin, controllerSeries.comment);

module.exports = router;
