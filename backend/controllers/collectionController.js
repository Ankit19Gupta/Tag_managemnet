const Collection = require("../models/Collection");

exports.createCollection = async (req, res) => {
  try {
    const { name, description, tags, products } = req.body;

    const newCollection = new Collection({
      name,
      description,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      products: products ? products.split(",").map((id) => id.trim()) : [],
    });

    const collection = await newCollection.save();

    res.status(201).json({ success: true, collection });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Collection name already exists." });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all collections
exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().populate("products");
    res
      .status(200)
      .json({ success: true, count: collections.length, collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a collection
exports.updateCollection = async (req, res) => {
  try {
    const { name, description, tags, products } = req.body;
    const updateData = {
      name,
      description,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : undefined,
      products: products
        ? products.split(",").map((id) => id.trim())
        : undefined,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }

    res.status(200).json({ success: true, collection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
