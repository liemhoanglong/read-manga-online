const express = require("express");
const multer = require("multer");
const ChapterController = require("../controllers/chapter.controller");
const { uploadImage } = require("../middlewares/image.mdw");
const router = express.Router();
const upload = multer({
  dest: "uploads/",
});
router.get("/:id/detail", ChapterController.getByChapterId);
router.get("/create", ChapterController.vwCreate);
router.get("/edit", ChapterController.vwUpdate);
router.post(
  "/create",
  upload.array("photos", 12),
  uploadImage,
  ChapterController.create
);
router.put("/update/:id", ChapterController.update);

module.exports = router;
