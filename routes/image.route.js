const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const uuidv4 = require("../services/utils").uuidv4();
const multer = require("multer");

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "uploads/",
});

// router.post(
//   "/upload",
//   upload.single("photos" /* name attribute of <file> element in your form */),
//   (req, res) => {
//     const tempPath = req.file.path;
//     const targetPath = path.join(__dirname, "./uploads/image.png");
//     fs.rename(tempPath, targetPath, (err) => {
//       if (err) return handleError(err, res);
//       res.status(200).contentType("text/plain").end("File uploaded!");
//     });
//     // if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//     //   fs.rename(tempPath, targetPath, (err) => {
//     //     if (err) return handleError(err, res);
//     //     res.status(200).contentType("text/plain").end("File uploaded!");
//     //   });
//     // } else {
//     //   fs.unlink(tempPath, (err) => {
//     //     if (err) return handleError(err, res);
//     //     res
//     //       .status(403)
//     //       .contentType("text/plain")
//     //       .end("Only .png files are allowed!");
//     //   });
//     // }
//   }
// );
router.post("/upload", upload.array("photos", 12), function (req, res, next) {
  const targetPath = path.join(__dirname, `../uploads/image${uuidv4}.png`);
  console.log(targetPath, req.files, req.body);
  if (req && req.files && req.files.length > 0) {
    const files = req.files;
    files.forEach((file) => {
      const tempPath = file.path;
      const filename = file.filename;
      console.log(tempPath);
      const targetPath = path.join(
        __dirname,
        `../uploads/image${filename}.png`
      );
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
        res.status(200).contentType("text/plain").end("File uploaded!");
      });
    });
  }
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});

module.exports = router;
