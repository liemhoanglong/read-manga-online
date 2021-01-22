const express = require("express");
const multer = require("multer");
const ChapterController = require("../controllers/chapter.controller");
const { uploadImage } = require("../middlewares/image.mdw");

const { authNotLogin, authLogin } = require("../middlewares/auth.mdw.js");
const router = express.Router();
const upload = multer({
  dest: "uploads/",
});
router.get("/:id/detail", ChapterController.getByChapterId);
router.get("/create", authLogin, ChapterController.vwCreate);
router.get("/:id/edit", authLogin, ChapterController.vwUpdate);
router.post(
  "/create",
  upload.array("photos", 12),
  uploadImage,
  ChapterController.create
);
router.post(
  "/update",
  upload.array("photos", 12),
  uploadImage,
  ChapterController.update
);

module.exports = router;
