const nodemailer = require("nodemailer");

async function emailVerification(email, otp) {
  if (!email) {
    throw new Error("Email is required");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Jahid" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification",
      text: "Welcome! Your email has been verified successfully.",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #222;">Welcome 🎉</h2>
            <p style="font-size: 16px; color: #555;">
              Your email has been verified successfully.
              Here is OTP: ${otp} 
            </p>
            
          </div>
        </div>
      `,
    });

    console.log("✅ Message sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Error while sending mail:", err.message);
    throw err;
  }
}

module.exports = emailVerification;