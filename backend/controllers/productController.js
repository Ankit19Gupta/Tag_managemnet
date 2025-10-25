const Product = require("../models/Product");
const { uploadToCloudinary } = require("../config/cloudinary");
const {
  runJustInTagging,
  runBestSellerTagging,
  runLimitedUnitsTagging,
} = require("./ruleControllers");

// Create a new product with image upload
// exports.createProduct = async (req, res) => {
//   try {
//     const { title, sku, price, stock, description, tags, collections } =
//       req.body;
//     let mainImageUrl = "";

//     if (req.file) {
//       const result = await uploadToCloudinary(req.file, "product-images");
//       mainImageUrl = result.secure_url;
//     }

//     const newProduct = new Product({
//       title,
//       sku,
//       price,
//       stock,
//       description,
//       mainImageUrl,
//       tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
//       collections: collections
//         ? collections.split(",").map((id) => id.trim())
//         : [],
//     });

//     const product = await newProduct.save();

//     res.status(201).json({ success: true, product });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res
//         .status(400)
//         .json({ success: false, message: "SKU already exists." });
//     }
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// NOTE: This file assumes you have defined the 'Product' Mongoose model
// and the 'uploadToCloudinary' utility function elsewhere.
// const Product = require('../models/Product');
// const uploadToCloudinary = require('../utils/cloudinary');

/**
 * @description Creates a new product, handling image uploads from either Base64 string (JSON body)
 * or multipart form data (req.file).
 * @route POST /api/products
 * @access Private/Admin
 */
exports.createProduct = async (req, res) => {
  try {
    // Destructure all required and new fields
    const {
      title,
      sku,
      price,
      stock,
      description,
      tags,
      collections,
      mainImageBase64, // The new field for Base64 image data
    } = req.body;

    let mainImageUrl = "";

    // ----------------------------------------------------------------------
    // 1. IMAGE UPLOAD LOGIC: Prioritize Base64, Fallback to req.file
    // ----------------------------------------------------------------------

    // Check 1: Handle Base64 encoded image string from the request body (typically used for pure JSON uploads)
    if (
      mainImageBase64 &&
      typeof mainImageBase64 === "string" &&
      mainImageBase64.length > 0
    ) {
      // Assuming uploadToCloudinary can handle a raw Base64 string or data URI
      console.log("Uploading image via Base64 string...");
      const result = await uploadToCloudinary(
        mainImageBase64,
        "product-images" // Folder name in Cloudinary
      );
      mainImageUrl = result.secure_url;

      // Check 2: Handle file uploaded via standard multipart/form-data (Kept for compatibility)
    } else if (req.file) {
      console.log("Uploading image via req.file (multipart form data)...");
      const result = await uploadToCloudinary(req.file.path, "product-images"); // req.file.path contains local path after multer processing
      mainImageUrl = result.secure_url;
    }

    // NOTE: If both mainImageBase64 and req.file are missing, mainImageUrl remains ""

    // ----------------------------------------------------------------------
    // 2. PRODUCT CREATION
    // ----------------------------------------------------------------------

    // Prepare tags and collections (convert comma-separated string to array)
    const processedTags = tags ? tags.split(",").map((tag) => tag.trim()) : [];
    const processedCollections = collections
      ? collections.split(",").map((id) => id.trim())
      : [];

    const newProduct = new Product({
      title,
      sku,
      price,
      stock,
      description,
      mainImageUrl, // This field stores the final Cloudinary URL
      tags: processedTags,
      collections: processedCollections,
    });

    const product = await newProduct.save();

    res.status(201).json({ success: true, product });
  } catch (error) {
    // ----------------------------------------------------------------------
    // 3. ERROR HANDLING
    // ----------------------------------------------------------------------

    // Handle Mongoose unique index violation (SKU is likely unique)
    if (error.code === 11000) {
      console.error("Duplicate SKU error:", error);
      return res.status(400).json({
        success: false,
        message: "SKU already exists. Please choose a unique identifier.",
      });
    }

    // General server error
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Assuming the necessary dependencies are defined above this function (e.g., const Product = require('./Product'))
// If this file is the only file, you would need to define those dependencies here.

// Example of dummy dependencies for context (you must replace these with your actual files)
/*
// Dummy Product Model
const Product = function(data) {
    this.save = async () => { 
        if (data.sku === 'DUP-SKU') { 
            throw { code: 11000 }; 
        } 
        return { ...data, _id: 'dummy-id' }; 
    };
};

// Dummy Cloudinary Uploader
const uploadToCloudinary = async (fileOrBase64, folder) => {
    // Simulate upload delay and return a URL
    await new Promise(resolve => setTimeout(resolve, 50));
    return { secure_url: `http://cloudinary.com/${folder}/image-url-${Math.random().toString(36).substring(7)}` };
};
*/

// Get all products with filtering by tags.
exports.getProducts = async (req, res) => {
  try {
    const { tag, search } = req.query;
    let filter = {};

    if (tag) {
      filter.tags = tag;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).populate("collections");
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "collections"
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { title, price, stock, description, tags, collections } = req.body;
    let updateData = {
      title,
      price,
      stock,
      description,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : undefined,
      collections: collections
        ? collections.split(",").map((id) => id.trim())
        : undefined,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    if (req.file) {
      const result = await uploadToCloudinary(req.file, "product-images");
      updateData.mainImageUrl = result.secure_url;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const applyTagToProduct = async (productId, tagName) => {
  await Product.updateOne({ _id: productId }, { $addToSet: { tags: tagName } });
};

const removeTagFromProduct = async (productId, tagName) => {
  await Product.updateOne({ _id: productId }, { $pull: { tags: tagName } });
};

exports.triggerAllActiveTags = async (req, res) => {
  try {
    const justInResult = await runJustInTagging();
    const limitedUnitsResult = await runLimitedUnitsTagging();
    const bestSellerResult = await runBestSellerTagging();

    res.status(200).json({
      success: true,
      message: "All active tagging rules triggered successfully.",
      results: {
        justIn: justInResult,
        limitedUnits: limitedUnitsResult,
        bestSeller: bestSellerResult,
      },
    });
  } catch (error) {
    console.error("Error triggering tags:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to trigger tags: " + error.message,
    });
  }
};

exports.applyTagToProduct = applyTagToProduct;
exports.removeTagFromProduct = removeTagFromProduct;
