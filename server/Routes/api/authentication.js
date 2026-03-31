const express = require("express");
const registrationControllers = require("../../controllers/registrationControllers");
const {otpController, resendOtpController, } = require("../../controllers/otpController");
const loginController = require("../../controllers/loginController");
const router = express.Router();


router.post("/registration", registrationControllers);
router.post("/otpverify", otpController);
router.post("/resendotp", resendOtpController)
router.post("/login", loginController)



module.exports = router;