const express = require("express");

const ChapterController = require("../controllers/chapter.controller");

const router = express.Router();

router.get("/:id", ChapterController.getByChapterId);

module.exports = router;
