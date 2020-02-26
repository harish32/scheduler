const Batch = require("../models/batch");
const ErrorResponse = require("../utils/ErrorResponce");

exports.getbatches = async (req, res, next) => {
  try {
    const batches = await Batch.find();
    res
      .status(200)
      .json({ success: true, data: batches, count: batches.length });
  } catch (err) {
    next(err);
  }
};

exports.addbatch = async (req, res, next) => {
  try {
    const batch = await Batch.create(req.body);
    res.status(200).json({ success: true, data: batch });
  } catch (err) {
    next(err);
  }
};

exports.getbatch = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id)
      .populate("users")
      .populate("schedules");
    if (!batch) {
      return next(new ErrorResponse("batch not found", 404));
    }
    res.status(200).json({ success: true, data: batch });
  } catch (err) {
    next(err);
  }
};

exports.deletebatch = async (req, res, next) => {
  try {
    const batch = await Batch.findById(req.params.id);
    if (!batch) {
      return next(new ErrorResponse("batch not found", 404));
    }
    await batch.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.updatebatch = async (req, res, next) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: batch });
  } catch (err) {
    next(err);
  }
};
