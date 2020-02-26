const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getuser,
  getusers,
  adduser,
  deleteuser,
  bookslot,
  updateuser,
  blockUser,
  changeBatch
} = require("../controllers/user");
const { protect, checkAdmin } = require("../middleware/auth");

router
  .route("/")
  .get(protect, checkAdmin, getusers)
  .post(protect, checkAdmin, adduser);

router.route("/bookslot").put(protect, bookslot);

router
  .route("/:id")
  .get(protect, checkAdmin, getuser)
  .put(protect, checkAdmin, updateuser)
  .delete(protect, checkAdmin, deleteuser);

router.route("/:id/block").put(protect, checkAdmin, blockUser);

router.route("/:userid/batch/:batchid").put(protect, checkAdmin, changeBatch);

module.exports = router;
