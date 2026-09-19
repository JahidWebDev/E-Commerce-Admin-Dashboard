const express = require("express");
const router = express.Router();

const authRoute = require("./authentication");
const categoryRoute = require("./category");
const subcategoryRoute = require("./subCategory");
const productRoute = require("./product");

router.use("/authentication", authRoute);
router.use("/category", categoryRoute);
router.use("/subcategory", subcategoryRoute);
router.use("/product", productRoute);

module.exports = router;    