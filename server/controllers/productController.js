const Product = require("../models/productSchema");

async function createProductController(req, res) {
  try {
    const {
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
    } = req.body;

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