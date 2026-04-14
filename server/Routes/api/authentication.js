const express = require("express");
const registrationControllers = require("../../controllers/registrationControllers");
const {otpController, resendOtpController, } = require("../../controllers/otpController");
const {loginController, dashBoard, logOut, } = require("../../controllers/loginController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");
const router = express.Router();


router.post("/registration", registrationControllers);
router.post("/otpverify", otpController);
router.post("/resendotp", resendOtpController)
router.post("/login", loginController)
router.post("/logout", logOut)
// router.get("/dashboard", authMiddleware, dashBoard)
router.get("/admin-dashboard", authMiddleware, roleMiddleware("admin"), dashBoard);
router.get("/user-dashboard", authMiddleware, roleMiddleware("user"), dashBoard);
module.exports = router;