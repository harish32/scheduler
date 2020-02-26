const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"]
  },
  hook: {
    type: Boolean,
    default: true
  },
  email: {
    type: String,
    required: [true, "please enetr email"],
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  mobile: {
    type: String,
    required: [true, "please enter mobile"]
  },
  blocked: {
    type: Boolean,
    default: false
  },
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch"
  },
  isAdmin: {
    type: Boolean,
    enum: [false],
    default: false
  },
  password: {
    type: String,
    required: true
  },
  schedules: [
    {
      scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule"
      },
      position: Number,
      selected: false,
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      title: String
    }
  ]
});

userSchema.methods.verify = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getjwt = async function() {
  const token = await jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d"
    }
  );
  return token;
};

userSchema.pre("save", async function(next) {
  if (!this.hook) {
    this.hook = true;
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
