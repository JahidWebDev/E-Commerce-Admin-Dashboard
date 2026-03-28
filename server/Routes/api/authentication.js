const express = require("express");
const registrationControllers = require("../../controllers/registrationControllers");
const otpController = require("../../controllers/otpController");
const router = express.Router();


router.post("/registration", registrationControllers)
router.post("/otpverify", otpController)



module.exports = router;