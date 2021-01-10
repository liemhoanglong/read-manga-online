const uuidv4 = require("../services/utils").uuidv4();
const chapterService = require("../services/chapter.service");
module.exports = {
  getByChapterId: async (req, res, next) => {
    //   const series = await seriesServices.getAllSeries();
    const { id } = req.params;
    console.log("id-", id);

    const chapter = [
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-1.jpg",
      },
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-3.jpg",
      },
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-3.jpg",
      },
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-3.jpg",
      },
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-3.jpg",
      },
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-3.jpg",
      },
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-3.jpg",
      },
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-3.jpg",
      },
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-3.jpg",
      },
      {
        _id: uuidv4,
        name: "Name 1",
        src:
          "https://canhrau.com/wp-content/uploads/2020/12/manga-la-gi-cac-the-loai-manga-hinh-3.jpg",
      },
    ];
    res.render("chapter/index", { title: "Chapter", id, chapter });
  },
  vwCreate: async (req, res, next) => {
    res.render("chapter/create", { title: "Create a new chapter" });
  },
  vwUpdate: async (req, res, next) => {
    res.render("chapter/update", { title: "Update a chapter" });
  },
  create: async (req, res, next) => {
    const err = false;
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "Hero deleted successfully",
    });
  },
  update: async (req, res, next) => {
    const err = false;
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "Hero deleted successfully",
    });
  },
};
