const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

   category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "category",
  required: true,
},

subCategory: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "subcategory",
  required: true,
},

    color: {
      type: [String],
      required: true,
    },

    ram: {
      type: [String],
      required: true,
    },

    size: {
      type: [String],
      required: true,
    },

    stores: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;