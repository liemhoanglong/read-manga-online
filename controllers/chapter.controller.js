const uuidv4 = require("../services/utils").uuidv4();
const chapterService = require("../services/chapter.service");
module.exports = {
  getByChapterId: async (req, res, next) => {
    const { id } = req.params;
    try {
      console.log("id-", id);
      const chapter = await chapterService.getById(id);
      const images = chapter.imageList ? chapter.imageList : [];
      res.render("chapter/index", { title: "Chapter", chapter, images });
    } catch (err) {
      res.json({
        error: err,
      });
    }
    // const chapter = [
    //   {
    //     _id: uuidv4,
    //     name: "Name 1",
    //     src:
    //       "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-1.jpg",
    //   },
    // ];
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
