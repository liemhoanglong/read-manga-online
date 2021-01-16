const uuidv4 = require("../services/utils").uuidv4();
const chapterService = require("../services/chapter.service");
module.exports = {
  getByChapterId: async (req, res, next) => {
    const { id } = req.params;
    try {
      const chapter = await chapterService.getById(id);
      let chapterList = [];
      if (chapter) {
        const seriesId = chapter.series;
        chapterList = await chapterService.getChapterBySeriesId(seriesId);
      }
      // Setting pagination
      const curIndex = chapterList.findIndex((chapter) => chapter._id == id);
      const size = chapterList.length;
      const prevIndex = curIndex - 1;
      const nextIndex = curIndex + 1;
      const prevChap =
        size >= 0 ? (prevIndex >= 0 ? chapterList[prevIndex]._id : null) : null;
      const nextChap =
        size >= 0
          ? nextIndex < size
            ? chapterList[nextIndex]._id
            : null
          : null;
      // chapterList.forEach((chapter) => console.log(chapter._id));
      const images = chapter.imageList ? chapter.imageList : [];
      res.render("chapter/index", {
        title: "Chapter",
        chapter,
        images,
        chapterList,
        prevChap,
        nextChap,
      });
    } catch (err) {
      res.json({
        error: err,
      });
    }
  },
  vwCreate: async (req, res, next) => {
    res.render("chapter/create", { title: "Create a new chapter" });
  },
  vwUpdate: async (req, res, next) => {
    const { id } = req.params;
    try {
      console.log("id-", id);
      const chapter = await chapterService.getById(id);
      const images = chapter.imageList ? chapter.imageList : [];

      res.render("chapter/update", {
        title: "Update a chapter",
        chapter,
        images,
      });
    } catch (err) {
      res.json({
        error: err,
      });
    }
  },
  create: async (req, res, next) => {
    const data = req.body;
    console.log(`create`, data);
    try {
      const chapter = await chapterService.create(data);
      const chapterId = chapter._id;
      res.redirect(`/chapters/${chapterId}/detail`);
    } catch (err) {
      res.json({
        error: err,
      });
    }
  },
  update: async (req, res, next) => {
    const data = req.body;
    console.log(`update`, data);
    try {
      const chapter = await chapterService.update(data);
      const chapterId = chapter._id;
      res.redirect(`/chapters/${chapterId}/detail`);
    } catch (err) {
      res.json({
        error: err,
      });
    }
  },
};
