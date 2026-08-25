const categorySchema = require("../models/categorySchema");

async function categoryController(req, res) {
  const { name, description } = req.body;
const existingCategory = await categorySchema.findOne({ name });

if (existingCategory) {
  return res.status(400).json({
    error: "This category already exists",
  });
}

const category = new categorySchema({
    name,
    description
  });

  await category.save();

  res.status(201).json({
    message: "Category created successfully",
    category
  });
}

async function getAllCategoryController(req, res) {
  try {
    const allCategory = await categorySchema.find({});

    res.status(200).json({
      categories: allCategory
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
module.exports = {categoryController, getAllCategoryController };