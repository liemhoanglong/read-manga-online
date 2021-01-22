const MemberService = require("../services/member.services");
const SeriesService = require("../services/series.services");
const GenreService = require("../services/genre.service");

module.exports = {
  getMemberProfile: (req, res, next) => {
    res.render("profile");
  },
  getLoginPage: (req, res, next) => {
    const message = req.flash();
    console.log("error", message.error);
    res.render("login", { error: message.error });
  },
  login: (req, res, next) => {},
  logout: (req, res, next) => {
    req.logout();
    res.redirect("/");
  },
  register: (req, res, next) => {},
  getRegisterPage: (req, res, next) => {
    const message = req.flash();
    console.log("error", message.error);
    res.render("register", { error: message.error });
  },
  createNewMember: async (req, res, next) => {
    const rawUser = req.body;
    console.log(rawUser);
    if (rawUser.email && rawUser.password && rawUser.fullName)
      if (rawUser.password === rawUser.retype_password) {
        const userData = {};
        userData.email = rawUser.email;
        userData.password = rawUser.password;
        userData.fullName = rawUser.fullName;
        console.log("userData", userData);
        const userRes = await MemberService.createNewMember(userData);
        console.log("userRes", userRes);
        if (userRes) {
          return res.redirect("/members/login");
        } else {
          return res.send("something when wrong!");
        }
      } else {
        req.flash("error", "Mật khẩu nhập lại không đúng");
        return res.redirect("/members/register");
      }
    res.redirect("/members/register");
  },
  updateMemberProfile: async (req, res, next) => {
    const body = req.body;
    console.log("in");
    const newData = {};
    newData.avatar = body.avatar;
    newData.fullName = body.fullName;
    const status = await MemberService.update(req.user.email ,newData);
    if (!status) {
      req.flash(message, "Cập nhật thất bại!");
    }

    const url = req.originalUrl;
    return res.redirect(url);
  },

  // Begin of Nguyen Manh Linh's works ===========================================================================
  loadSeriesFollowing: async (req, res) => {
    const member = req.user;

    var seriesFollowing = [];
    for (const seriesID of member.favoriteSeries) {
      seriesFollowing.push(await SeriesService.getSeries(seriesID));
    }
    console.log(seriesFollowing);

    res.render("series-following", { seriesFollowing: seriesFollowing });
  },
  loadSeriesPosting: async (req, res) => {
    const allGenres = await GenreService.getAllGenres();

    res.render("series-posting", { allGenres: allGenres });
  },
  postSeries: (req, res) => {
    console.log(req.body);

    const body = req.body;

    SeriesService.createSeries(
      body.name,
      body.author,
      req.user._id,
      [body.genre],
      body.summary,
      body.thumbnail
    );

    res.redirect("/members/series-posted");
  },
  loadSeriesPosted: async (req, res) => {
    const seriesPosted = await SeriesService.getSeriesPostedByMember(
      req.user._id
    );
    res.render("series-posted", { seriesPosted: seriesPosted });
  },
  loadUpdateSeries: async (req, res) => {
    const series = await SeriesService.getSeries(req.params.id);
    const allGenres = await GenreService.getAllGenres();

    res.render("series-update", { series: series, allGenres: allGenres });
  },
  // End of Nguyen Manh Linh's works ============================================================================
};
