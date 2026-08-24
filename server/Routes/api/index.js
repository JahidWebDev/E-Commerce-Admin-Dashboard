const express = require("express");
const router = express.Router();

const authRoute = require("./authentication");
const categoryRoute = require("./category");

router.use("/authentication", authRoute);
router.use("/category", categoryRoute);

module.exports = router;