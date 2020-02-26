const User = require("../models/user");
const sendEmail = require("../utils/sendemail");
// const io = require("../index");
const Schedule = require("../models/schedule");
const ErrorResponse = require("../utils/ErrorResponce");

exports.getusers = async (req, res, next) => {
  try {
    console.log(req.query);
    const users = await User.find(req.query);
    res.status(200).json({ success: true, data: users, count: users.length });
  } catch (err) {
    next(err);
  }
};

exports.adduser = async (req, res, next) => {
  try {
    const user = await User.create(...req.body);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.getuser = (req, res, next) => {
  try {
    const user = User.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse("user not found", 404));
    }
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse("user not found", 404));
    }
    await user.remove();
    res
      .status(200)
      .json({ success: true, data: {}, err: "successfully deleted" });
  } catch (err) {
    next(err);
  }
};

exports.updateuser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email, mobile: req.body.mobile },
      {
        new: true,
        runValidators: true
      }
    );
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.bookslot = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const schedule = user.schedules.find(
      ele => ele.scheduleId.toString() == req.body.scheduleId
    );
    if (schedule.selected) {
      return next(
        new ErrorResponse("you have already made the booking!!!", 400)
      );
    }
    schedule.from = req.body.from;
    schedule.to = req.body.to;
    schedule.position = req.body.position;
    schedule.selected = true;
    user.hook = false;
    await user.save();
    const sched = await Schedule.findById(schedule.scheduleId);
    req.socket.of("/").emit(`schedules/${schedule.scheduleId}`, sched);
    res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
};

exports.blockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    user.blocked = !user.blocked;
    user.hook = false;
    await user.save();
    res.status(200).json({ success: true, blocked: user.blocked });
  } catch (err) {
    next(err);
  }
};

exports.changeBatch = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userid, {
      batchId: req.params.batchid
    });
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
