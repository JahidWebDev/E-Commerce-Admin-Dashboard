const express = require("express");

const router = express.Router();

const createProductController = require("../../controllers/productController");

router.post("/createproduct", createProductController);

module.exports = router;
