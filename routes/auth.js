const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { login, resetpassword, logout } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/resetpassword").post(protect, resetpassword);

module.exports = router;
