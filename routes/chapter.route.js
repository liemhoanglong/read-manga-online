const express = require("express");

const ChapterController = require("../controllers/chapter.controller");

const router = express.Router();

router.get("/:id/detail", ChapterController.getByChapterId);
router.get("/create", ChapterController.vwCreate);
router.get("/edit", ChapterController.vwUpdate);
router.post("/create", ChapterController.create);
router.put("/update/:id", ChapterController.update);

module.exports = router;
