const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const getuser = (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
};

router.route("/").get(protect, getuser);

module.exports = router;
