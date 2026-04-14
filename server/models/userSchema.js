const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpiry:{
      type: Date,
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    default: "user",
    enum: ["user", "admin"]
  }
});

module.exports = mongoose.model("userList", userSchema)
