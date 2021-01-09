var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET series posting
router.get('/series-posting', (req, res) => {
  res.render('series-posting');
});

// POST series post
router.post('/series-posting', (req, res) => {

  console.log(req.body);

  res.redirect('/users/series-posting');
});

// GET series posted
router.get('/series-posted', (req, res) => {
  res.render('series-posted');
});

module.exports = router;
