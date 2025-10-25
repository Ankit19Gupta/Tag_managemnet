const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    mainImageUrl: {
      type: String,
      default: "",
    },
    // We use additional images in future.
    images: {
      type: [String],
      default: [],
    },
    // We store videos url in case of need in future.
    videos: {
      type: [String],
      default: [],
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    // Tags applied by the rules
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
