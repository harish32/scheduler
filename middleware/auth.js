const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/ErrorResponce");

exports.protect = async (req, res, next) => {
  if (!req.cookies.token) {
    return next(new ErrorResponse("not authenticated", 401));
  }
  const token = jwt.decode(req.cookies.token);

  req.user = await User.findById(token.id).select("-password");
  if (!req.user) {
    return next(new ErrorResponse("token invalid", 400));
  }
  next();
};

exports.checkAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new ErrorResponse("not authorized2", 403));
  }
  next();
};
