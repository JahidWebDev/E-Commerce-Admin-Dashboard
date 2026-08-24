const express = require("express");
const categoryController = require("../../controllers/catrgoryController");
const router = express.Router();

router.post("/createcategory", categoryController);


module.exports = router;