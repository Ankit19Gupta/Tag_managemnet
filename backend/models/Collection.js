const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // Image to represent the collection
    coverImageUrl: {
      type: String,
      default: "",
    },
    // Total count of products in this collection.
    productCount: {
      type: Number,
      default: 0,
    },
    // Tags associated with the collection itself.
    tags: {
      type: [String],
      default: [],
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
