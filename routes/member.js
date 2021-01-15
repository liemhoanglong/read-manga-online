const express = require("express");
const router = express.Router();

const passport = require("passport");
const memberController = require("../controllers/members.controller.js");
const { authNotLogin, authLogin } = require("../middlewares/auth.mdw.js");

/* GET users listing. */
router.get("/",authLogin, function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login",authNotLogin, memberController.getLoginPage);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/members/login",
    successRedirect: "/",
    failureFlash: true
  })
);
router.get("/logout",authLogin , memberController.logout);
router.get("/register",authNotLogin, memberController.getRegisterPage);
router.post("/register",authNotLogin, memberController.createNewMember);
router.post("/profile",authLogin , memberController.updateMemberProfile);
router.get("/profile",authLogin , memberController.getMemberProfile);



// GET series posting
router.get('/series-posting', authLogin, memberController.loadSeriesPosting);
// POST series posting
router.post('/series-posting', memberController.postSeries);
// GET series posted
router.get('/series-posted', authLogin, memberController.loadSeriesPosted);
// GET series following
router.get('/series-following', authLogin, memberController.loadSeriesFollowing);
// GET series update
router.get('/series-update/:id', authLogin, memberController.loadUpdateSeries);

module.exports = router;
