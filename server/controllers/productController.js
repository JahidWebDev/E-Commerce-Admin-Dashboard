const Product = require("../models/productSchema");

async function createProductController(req, res) {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      color,
      ram,
      size,
      stores,
    } = req.body;

    const image = req.file
      ? `http://localhost:3000/api/v1/uploads/${req.file.filename}`
      : null;

    const product = new Product({
      name,
      price,
      description,
      image,
      category,
      subCategory,
      color,
      ram,
      size,
      stores,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Product creation failed",
      error: error.message,
    });
  }
}

module.exports = createProductController;