module.exports = function (app) {
  app.use("/", require("../routes/index"));
  app.use("/chapters", require("../routes/chapter.route"));
  app.use("/users", require("../routes/users"));
};
