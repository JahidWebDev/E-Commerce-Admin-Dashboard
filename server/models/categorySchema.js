const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  subcategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory"
  }]
});

module.exports = mongoose.model("category", categorySchema)
