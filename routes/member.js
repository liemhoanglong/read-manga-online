const express = require("express");
const router = express.Router();

const passport = require("passport");
const UserController = require("../controllers/members.controller.js");
const { authNotLogin, authLogin } = require("../middlewares/auth.mdw.js");

const seriesController = require('../controllers/series.controller.js');

/* GET users listing. */
router.get("/",authLogin, function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login",authNotLogin, UserController.getLoginPage);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/members/login",
    successRedirect: "/",
    failureFlash: true
  })
);
router.get("/logout",authLogin , UserController.logout)
router.get("/register",authNotLogin, UserController.getRegisterPage);

router.post("/register",authNotLogin, UserController.createNewMember);

router.get("/profile",authLogin , UserController.getMemberProfile );



// GET series posting
router.get('/series-posting', seriesController.loadSeriesPosting);
// POST series posting
router.post('/series-posting', seriesController.postSeries);
// GET series posted
router.get('/series-posted', seriesController.loadSeriesPosted);
// GET series following
router.get('/series-following', seriesController.loadSeriesFollowing)
// GET series update
router.get('/series-update', seriesController.loadSeriesUpdate)

module.exports = router;
