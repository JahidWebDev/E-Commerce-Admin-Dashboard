const express = require("express");
const {categoryController, getAllCategoryController, getSingleController, updateSingleCategoryController, deleteCategoryController} = require("../../controllers/catrgoryController");
const router = express.Router();

router.post("/createcategory", categoryController);
router.get("/getallcategory", getAllCategoryController);
router.get("/getsinglecategory/:id", getSingleController);
router.patch("/updatesinglecategory/:id", updateSingleCategoryController);
router.delete("/deletecategory/:id", deleteCategoryController);


module.exports = router;