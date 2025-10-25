const mongoose = require("mongoose");

const misspeltTagsRuleSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      trim: true,
      default: "Misspelt Tags",
    },
    shopifySiteSearchConnected: {
      type: Boolean,
      required: true,
      default: true,
    },
    googleSearchConsoleConnected: {
      type: Boolean,
      required: true,
      default: true,
    },
    allTags: {
      type: [String],
      default: ["mispelled", "mispellied", "misspelt", "mispelled", "misspell"],
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

module.exports = mongoose.model("MisspeltTagsRule", misspeltTagsRuleSchema);
