const express = require("express");
const registrationControllers = require("../../controllers/registrationControllers");
const {otpController, resendOtpController, } = require("../../controllers/otpController");
const router = express.Router();


router.post("/registration", registrationControllers);
router.post("/otpverify", otpController);
router.post("/resendotp", resendOtpController)



module.exports = router;