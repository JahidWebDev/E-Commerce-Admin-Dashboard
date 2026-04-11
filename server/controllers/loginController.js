const bcrypt = require("bcrypt");
const emailValidation = require("../helpers/emailvalidation");
const userSchema = require("../models/userSchema");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Give your email" });
    }

    if (!password) {
      return res.status(400).json({ error: "Give your password" });
    }

    if (!emailValidation(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    const existingUser = await userSchema.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!existingUser.isVerified) {
      return res.status(400).json({ error: "Email is not verified" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    req.session.isAuth = true;

    req.session.user = {
      id: existingUser._id.toString(),
      email: existingUser.email,
      firstName: existingUser.firstName,
    };

    return res.status(200).json({
      message: "Login successfully done",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function logOut(req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.status(400).json({ error: "Something is a error" });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      message: "Logout successfully done",
    });
  });
}

function dashBoard(req, res) {
  res.status(200).json({
    message: "Welcome to dashboard",
    user: req.session.user,
  });
}

module.exports = { loginController, dashBoard, logOut };
