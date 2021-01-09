const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../services/user.services");
const bcrypt = require('bcrypt');

module.exports = function () {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (username, password, done) {
        const usrData = await User.getUserByEmail(username);
        console.log("passport", "User data", usrData);
        if (usrData) {
          console.log("passport", "userData", usrData);
          console.log("passport", "pwd", password);
          if(usrData.isBanned == true){
            return done(null, false, {message: "User has been blocked"});
          }
          const pass = bcrypt.compareSync(password, usrData.password);
          if (pass) {
            return done(null, usrData);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        }
        return done(null, false, { message: "Incorrect username." });
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("serial", user);
    done(null, user.email);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("id", id);
    const user =await User.getUserByEmail(id);
    console.log("user", user);
    done(null, user);
  });
};
