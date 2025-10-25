const mongoose = require("mongoose");

const limitedUnitsRuleSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      trim: true,
      default: "Limited Units Left",
    },
    inventoryThreshold: {
      type: Number,
      required: true,
      min: 0,
      default: 10,
    },
    checkFrequency: {
      type: String,
      enum: ["Real-time (recommended)", "Daily", "Hourly"],
      required: true,
      default: "Real-time (recommended)",
    },
    // Remove tag automatically when stock is replenished
    autoRemoveTag: {
      type: Boolean,
      required: true,
      default: true,
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

module.exports = mongoose.model("LimitedUnitsRule", limitedUnitsRuleSchema);
