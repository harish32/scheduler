const mongoose = require("mongoose");
const User = require("./user");

const scheduleSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter a title"]
  },
  date: String,
  slots: [
    {
      date: {
        type: Date,
        default: Date.now()
      },
      timeSlots: [
        {
          count: {
            type: Number,
            required: [true, "please add the count"]
          },
          from: {
            type: String,
            required: ["true", "please add the from timing"]
          },
          end: {
            type: String,
            required: ["true", "please add the end timing"]
          },
          total: Number
        }
      ]
    }
  ],
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch"
  },
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ]
});

// scheduleSchema.pre("save", function() {
//   this.total = this.count;
// });

scheduleSchema.pre("remove", async function() {
  await User.updateMany(
    { batchId: this.batchId },
    { $pull: { schedules: { scheduleId: this._id } } }
  );
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
