const express = require("express");
const router = express.Router();

const authRoute = require("./authentication");
const categoryRoute = require("./category");
const subcategoryRoute = require("./subCategory");

router.use("/authentication", authRoute);
router.use("/category", categoryRoute);
router.use("/subcategory", subcategoryRoute);

module.exports = router;    