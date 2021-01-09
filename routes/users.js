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


module.exports = router;
