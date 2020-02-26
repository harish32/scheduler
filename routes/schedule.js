const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getschedule,
  getschedules,
  updateschedule,
  deleteschedule,
  addschedule,
  addslot,
  updateSlots,
  getScheduleUsers
} = require("../controllers/schedule");
const { protect, checkAdmin } = require("../middleware/auth");

router
  .route("/")
  .get(protect, checkAdmin, getschedules)
  .post(protect, checkAdmin, addschedule);
router
  .route("/:id")
  .get(protect, getschedule)
  .put(protect, checkAdmin, updateschedule)
  .delete(protect, checkAdmin, deleteschedule);
router.route("/:id/select").post(addslot);
router.route("/:id/users").get(getScheduleUsers);
router.route("/slots/update").put(updateSlots);

module.exports = router;
