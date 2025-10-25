const mongoose = require("mongoose");

const bestSellerRuleSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      trim: true,
      default: "Best Seller",
    },
    periodInDays: {
      type: Number,
      required: true,
      min: 1,
      default: 7,
    },
    topXSoldProducts: {
      type: Number,
      required: true,
      min: 1,
      default: 10,
    },
    locationFilters: {
      country: { type: String, trim: true, default: "" },
      state: { type: String, trim: true, default: "" },
      city: { type: String, trim: true, default: "" },
    },
    runSchedule: {
      type: String,
      enum: ["Daily", "Hourly", "Weekly"],
      required: true,
      default: "Daily",
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

module.exports = mongoose.model("BestSellerRule", bestSellerRuleSchema);
