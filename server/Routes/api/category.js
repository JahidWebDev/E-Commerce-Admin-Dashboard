const express = require("express");
const {categoryController, getAllCategoryController, getSingleController} = require("../../controllers/catrgoryController");
const router = express.Router();

router.post("/createcategory", categoryController);
router.get("/getallcategory", getAllCategoryController);
router.get("/getsinglecategory/:id", getSingleController);


module.exports = router;