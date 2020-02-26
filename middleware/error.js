const error = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === "ValidationError") {
    const errmsg = Object.keys(err.errors)
      .map(ele => err.errors[ele])
      .join(",");
    error.message = errmsg;
    error.statusCode = 400;
  }
  if (err.code === 11000) {
    const errmsg = Object.keys(err.keyValue)[0];
    error.message = `${errmsg} is already taken`;
    error.statusCode = 400;
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, err: error.message });
};

module.exports = error;
