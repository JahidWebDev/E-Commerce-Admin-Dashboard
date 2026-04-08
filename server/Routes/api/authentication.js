const express = require("express");
const registrationControllers = require("../../controllers/registrationControllers");
const {otpController, resendOtpController, } = require("../../controllers/otpController");
const {loginController, dashBoard, logOut, } = require("../../controllers/loginController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();


router.post("/registration", registrationControllers);
router.post("/otpverify", otpController);
router.post("/resendotp", resendOtpController)
router.post("/login", loginController)
router.post("/logout", logOut)
router.get("/dashboard", authMiddleware, dashBoard)



module.exports = router;