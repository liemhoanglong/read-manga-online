const path = require("path");
const fs = require("fs");
const uuidv4 = require("../services/utils").uuidv4();
const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

module.exports = {
  uploadImage: (req, res, next) => {
    const targetPath = path.join(__dirname, `../uploads/image${uuidv4}.png`);
    console.log(req.body);
    let images = [];
    if (req.body && req.body.images) {
      const curImages = req.body.images;
      Object.keys(curImages).forEach((key) => images.push(curImages[key]));
    }
    if (req && req.files && req.files.length > 0) {
      const files = req.files;
      files.forEach((file) => {
        const tempPath = file.path;
        const filename = file.filename;
        const targetPath = path.join(
          __dirname,
          `../uploads/image${filename}.png`
        );
        // const image = {
        //   name: filename,
        //   url: `/image${filename}.png`,
        // };
        const image = `/image${filename}.png`;
        images.push(image);
        fs.rename(tempPath, targetPath, (err) => {
          if (err) return handleError(err, res);
          // res.status(200).contentType("text/plain").end("File uploaded!");
        });
      });
    }
    const body = {
      name: req.body.name,
      series: req.body.seriesId,
      postedDate: new Date(),
      status: -1,
      imageList: images,
    };
    if (req.body.images) delete req.body.images;
    req.body = Object.assign({}, req.body, body);
    next();
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  },
};
