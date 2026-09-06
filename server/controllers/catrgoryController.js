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
    description,
  });

  await category.save();

  res.status(201).json({
    message: "Category created successfully",
    category,
  });
}

async function getAllCategoryController(req, res) {
  try {
    const allCategory = await categorySchema.find({});

    res.status(200).json({
      message: "Get all category",
      status: "succes",
      categories: allCategory,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function getSingleController(req, res) {
  try {
    const { id } = req.params;

    const getSingleCategory = await categorySchema.findById(id);

    res.status(200).json({
      message: "Get single category",
      status: "success",
      category: getSingleCategory,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function updateSingleCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updateCategory = await categorySchema.findById(id);

    if (!updateCategory) {
      return res.status(404).json({
        message: "Category not found",
        status: "error",
      });
    }

    updateCategory.name = name;
    updateCategory.description = description;

    await updateCategory.save();

    res.status(200).json({
      message: "Category update successful",
      status: "success",
      category: updateCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: "error",
      error: error.message,
    });
  }
}

async function deleteCategoryController(req, res) {
  try {
    const { id } = req.params;

    const deleteCategory = await categorySchema.findByIdAndDelete(id);

    if (!deleteCategory) {
      return res.status(404).json({
        message: "Category not found",
        status: "error",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      status: "success",
      data: deleteCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: "error",
      error: error.message,
    });
  }
}

module.exports = {
  categoryController,
  getAllCategoryController,
  getSingleController,
  updateSingleCategoryController,
  deleteCategoryController,
};
