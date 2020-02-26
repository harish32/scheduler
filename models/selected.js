const mongoose = require("mongoose");

const selectedSchema = {
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule"
  },
  time: {
    date: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  position: Number
};

const Selected = mongoose.model("Selected", selectedSchema);

module.exports = Selected;
