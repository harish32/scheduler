const Schedule = require("../models/schedule");
const User = require("../models/user");
const ErrorResponse = require("../utils/ErrorResponce");

exports.getschedules = async (req, res, next) => {
  try {
    const schedules = await Schedule.find();
    res
      .status(200)
      .json({ success: true, data: schedules, count: schedules.length });
  } catch (err) {
    next(err);
  }
};

exports.getScheduleUsers = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate(
      "users.user"
    );
    res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
};

exports.addschedule = async (req, res, next) => {
  try {
    const schedule = new Schedule(req.body);
    const us = await User.find({ batchId: schedule.batchId });
    Array.from(us).forEach(ele => {
      ele.schedules.push({ scheduleId: schedule._id, title: schedule.title });
      ele.hook = false;
      schedule.users.push({ user: ele._id });
      ele.save();
    });
    schedule.save();
    res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
};

exports.getschedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return next(new ErrorResponse("schedule not found", 404));
    }
    res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
};

exports.deleteschedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return next(new ErrorResponse("schedule not found", 404));
    }
    await schedule.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.updateschedule = async (req, res, next) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
};

exports.addslot = async (req, res, next) => {
  try {
    const schedule = await Schedule.findOneAndUpdate(
      { _id: req.params.id, "slots._id": req.body.slotid },
      { $set: { "slots.$.userId": req.body.userid, "slots.$.selected": true } },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
};

exports.updateSlots = async (req, res, next) => {
  try {
    const schedule = await Schedule.findById(req.body.scheduleId);
    const slots = schedule.slots.find(ele => ele._id == req.body.slotId);
    let timeSlot = slots.timeSlots.find(ele => ele._id == req.body.timeslotId);
    if (timeSlot.count === 0) {
      return next(
        new ErrorResponse("slot is not available try another slot", 400)
      );
    }
    timeSlot.count = timeSlot.count - 1;
    await schedule.save();
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
