const mongoose = require("mongoose");

const aiSuggestedTagsRuleSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      trim: true,
      default: "AI Suggested",
    },
    productTitleEnabled: {
      type: Boolean,
      default: true,
    },
    productDescriptionEnabled: {
      type: Boolean,
      default: true,
    },
    productImagesEnabled: {
      type: Boolean,
      default: true,
    },
    productVideosEnabled: {
      type: Boolean,
      default: true,
    },
    minimumConfidenceThreshold: {
      type: Number,
      min: 0,
      max: 100,
      default: 95,
    },
    aiGeneratedTags: {
      type: [String],
      default: [],
      set: (v) =>
        Array.isArray(v)
          ? v.map((tag) => tag.trim())
          : v.split(",").map((tag) => tag.trim()),
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

module.exports = mongoose.model(
  "AiSuggestedTagsRule",
  aiSuggestedTagsRuleSchema
);
