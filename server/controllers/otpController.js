const userSchema = require("../models/userSchema");
const crypto = require("crypto");
async function otpController(req, res) {
  const { email, otp } = req.body;
  const user = await userSchema.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "User is not found" });
  }
  if (user.isVerified) {
    return res.json({ message: "User is verified" });
  }
  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "Invlid OTP" });
  }
  //   user.isVerified = true;
  //   user.otp = undefined;
  //   user.otpExpiry = undefined;
  //   await user.save();

  const updateUser = await userSchema.findOneAndUpdate(
    { email },
    {
      $set: { isVerified: true },
      $unset: { otp: "", otpExpiry: "" },
    },
    { new: true },
  );

  res.status(200).json({ message: "Email verification successfully done" });
}
async function resendOtpController(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    res.status(200).json({
      message: "OTP resent successfully",
      // otp // testing এর জন্য চাইলে temporarily দিতে পারো
    });

  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}




module.exports = {otpController, resendOtpController};
