const mongoose = require("mongoose");
const User = require("./user");

const batchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter a name"],
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

batchSchema.pre("remove", async function(next) {
  await User.deleteMany({ batchId: this._id });
  next();
});

batchSchema.virtual("users", {
  localField: "_id",
  foreignField: "batchId",
  ref: "User",
  justOne: false
});

batchSchema.virtual("schedules", {
  localField: "_id",
  foreignField: "batchId",
  ref: "Schedule",
  justOne: false
});

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
