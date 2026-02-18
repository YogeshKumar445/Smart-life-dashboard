const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    steps: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    sleep: {
      type: Number, // hours
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Health", healthSchema);
