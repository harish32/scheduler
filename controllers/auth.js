const User = require("../models/user");
const pick = require("lodash/pick");
const ErrorResponse = require("../utils/ErrorResponce");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("please provide email and password", 400));
    }
    const user = await User.findOne({ email, blocked: false }).select(
      "+password"
    );
    if (!user) {
      return next(new ErrorResponse("invalid credentials", 400));
    }
    const verified = await user.verify(password);
    if (!verified) {
      return next(new ErrorResponse("invalid credentials", 400));
    }
    const token = await user.getjwt();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true
      })
      .json({
        success: true,
        data: pick(user, ["name", "email", "schedules", "_id", "isAdmin"])
      });
  } catch (err) {
    next(err);
  }
};

exports.resetpassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const verified = await user.verify(req.body.currentpassword);
    if (!verified) {
      return next(new ErrorResponse("invalid password", 400));
    }
    user.password = this.newpassword;
    await user.save({ validateBeforeSave: true });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true
      })
      .json({ success: true });
  } catch (err) {
    next(err);
  }
};
