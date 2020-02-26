const {
  getbatch,
  getbatches,
  addbatch,
  deletebatch,
  updatebatch
} = require("../controllers/batches");
const express = require("express");
const router = express.Router();
const { protect, checkAdmin } = require("../middleware/auth");

router
  .route("/")
  .get(protect, checkAdmin, getbatches)
  .post(protect, checkAdmin, addbatch);
router
  .route("/:id")
  .get(protect, checkAdmin, getbatch)
  .put(protect, checkAdmin, updatebatch)
  .delete(protect, checkAdmin, deletebatch);

module.exports = router;
