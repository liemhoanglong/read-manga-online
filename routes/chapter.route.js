const express = require("express");

const ChapterController = require("../controllers/chapter.controller");

const router = express.Router();

router.get("/:id/detail", ChapterController.getByChapterId);
router.get("/create", ChapterController.create);
router.get("/edit", ChapterController.update);

module.exports = router;
