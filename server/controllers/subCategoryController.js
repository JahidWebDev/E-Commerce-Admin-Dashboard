
const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");

async function subCategoryController(req, res) {
  try {
    const { name, description, category } = req.body;

    const foundCategory = await categorySchema.findOne({
      name: category
    });


    if (!foundCategory) {
      return res.status(404).json({
        error: "Category not found"
      });
    }

    const subCategory = new subCategorySchema({
      name,
      description,
      category: foundCategory._id
    });

    await subCategory.save();
 await categorySchema.findOneAndUpdate(
  { _id: foundCategory._id },
  { $push: { subcategory: subCategory } },
  { new: true }
);
    res.status(201).json({
      message: "Subcategory created successfully",
      subCategory
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = {
  subCategoryController
};

