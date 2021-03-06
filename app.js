require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

const bodyParser = require("body-parser");

// const passport = require('passport');
// const session = require('express-session');

const indexRouter = require("./routes/index");
const membersRouter = require("./routes/member");
const { authLogin, logged } = require("./middlewares/auth.mdw");

const app = express();

console.log(process.env.DB_HOST);
// connect database
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database\n"))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const hbs = require("hbs");
require("./config/hbsHelper")(hbs);
hbs.registerPartials(__dirname + '/views/partials');

require("./config/passport")();
// app.use('/users', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(logged);
app.use("/", indexRouter);
app.use("/members", membersRouter);
app.use("/chapters", require("./routes/chapter.route"));
app.use("/photos", require("./routes/image.route"));
// require("./middlewares/routes.mdw")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
