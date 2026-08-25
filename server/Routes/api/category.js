const express = require("express");
const {categoryController, getAllCategoryController} = require("../../controllers/catrgoryController");
const router = express.Router();

router.post("/createcategory", categoryController);
router.get("/getallcategory", getAllCategoryController);


module.exports = router;