const express = require("express");
const router = express.Router();

const passport = require("passport");
const UserController = require("../controllers/users.controller.js");
const { authNotLogin, authLogin } = require("../middlewares/auth.mdw.js");

/* GET users listing. */
router.get("/",authLogin, function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login",authNotLogin, UserController.getLoginPage);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    successRedirect: "/",
    failureFlash: true
  })
);

router.get("/register",authNotLogin, UserController.getRegisterPage);

router.post("/register",authNotLogin, UserController.createNewUser);

router.get("/profile",authLogin , UserController.getUserProfile );

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
