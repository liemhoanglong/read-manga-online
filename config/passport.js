const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Member = require("../services/member.services");
const bcrypt = require('bcrypt');

module.exports = function () {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (username, password, done) {
        const usrData = await Member.getMemberByEmail(username);
        console.log("passport", "Member data", usrData);
        if (usrData) {
          console.log("passport", "memberData", usrData);
          console.log("passport", "pwd", password);
          if(usrData.isBanned == true){
            return done(null, false, {message: "Member has been blocked"});
          }
          const pass = bcrypt.compareSync(password, usrData.password);
          if (pass) {
            return done(null, usrData);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        }
        return done(null, false, { message: "Incorrect membername." });
      }
    )
  );

  passport.serializeUser((member, done) => {
    console.log("serial", member);
    done(null, member.email);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("id", id);
    const member =await Member.getMemberByEmail(id);
    console.log("member", member);
    done(null, member);
  });
};
