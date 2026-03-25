const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailValidation = require("../helpers/emailvalidation");
const userSchema = require("../models/userSchema");

async function registrationControllers(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({
      error: "FirstName & lastName is required",
    });
  }

  if (!emailValidation(email)) {
    return res.status(400).json({
      error: "Email is not valid",
    });
  }
  const exisitingEmail = await userSchema.findOne({ email });
  if (exisitingEmail) {
    return res.status(400).json({ error: "Email is used" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  const otp = crypto.randomInt(100000, 999999).toString();
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      return res.status(500).json({
        error: "Hashing failed",
      });
    }
    try {
      const user = new userSchema({
        firstName,
        lastName,
        email,
        password: hash,
        otp,
      });

      user.save();
      console.log(user);

      return res.status(200).json({
        message: "Registration successful",
        status: "success",
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Server error",
        details: error.message,
      });
    }
  });
}

module.exports = registrationControllers;
