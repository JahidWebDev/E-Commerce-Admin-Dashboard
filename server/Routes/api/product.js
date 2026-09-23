const express = require("express");

const router = express.Router();
const multer = require("multer");

const createProductController = require("../../controllers/productController");

const crypto = require('crypto');
const { log } = require("console");
const path = require("path");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },

  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err);

      const ext = path.extname(file.originalname);

      cb(
        null,
        file.fieldname + "-" + raw.toString("hex") + ext
      );
    });
  },
});

const upload = multer({ storage });

module.exports = upload;



router.post("/createproduct", upload.single('image'), createProductController);

module.exports = router;
