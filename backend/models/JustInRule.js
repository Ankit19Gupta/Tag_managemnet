const mongoose = require("mongoose");

const justInRuleSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      trim: true,
      default: "Just In",
    },
    // Products published within this timeframe will receive the tag
    productsPublishedInLastXDays: {
      type: Number,
      required: true,
      min: 1,
      default: 7,
    },
    runSchedule: {
      type: String,
      enum: ["Daily", "Hourly", "Weekly"],
      required: true,
      default: "Daily",
    },
    // Option for automatic remove
    autoRemoveTag: {
      type: Boolean,
      required: true,
      default: true,
    },
    autoRemoveAfterDays: {
      type: Number,
      min: 1,
      default: 30,
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JustInRule", justInRuleSchema);
