const express = require("express");
const router = express.Router();

const passport = require("passport");
const UserController = require("../controllers/members.controller.js");
const { authNotLogin, authLogin } = require("../middlewares/auth.mdw.js");

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
router.post("/profile",authLogin , UserController.updateMemberProfile );

// GET series posting
router.get('/series-posting', (req, res) => {
  res.render('series-posting');
});

// POST series post
router.post('/series-posting', (req, res) => {

  console.log(req.body);

  res.redirect('/members/series-posting');
});

// GET series posted
router.get('/series-posted', (req, res) => {
  res.render('series-posted');
});

module.exports = router;
