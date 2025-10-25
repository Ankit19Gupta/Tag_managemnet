const JustInRule = require("../models/JustInRule");
const BestSellerRule = require("../models/BestSellerRule");
const LimitedUnitsRule = require("../models/LimitedUnitsRule");
const MisspeltTagsRule = require("../models/MisspeltTagsRule");
const AiSuggestedTagsRule = require("../models/AiSuggestedTagsRule");
const Product = require("../models/Product");
const {
  applyTagToProduct,
  removeTagFromProduct,
} = require("./productController");

const saveRuleConfig = (Model) => async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    if (!id) {
      updateData.isDraft =
        updateData.isDraft !== undefined ? updateData.isDraft : true;
    }

    let rule;
    if (id) {
      rule = await Model.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
        upsert: false,
      });
      if (!rule)
        return res
          .status(404)
          .json({ success: false, message: `${Model.modelName} not found.` });
    } else {
      rule = await Model.create(updateData);
    }

    const message = rule.isDraft
      ? `${Model.modelName} saved as draft.`
      : `${Model.modelName} is now active.`;

    res.status(200).json({
      success: true,
      message: message,
      rule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save rule: " + error.message,
    });
  }
};

const getRuleConfiguration = (Model) => async (req, res) => {
  try {
    const rule = await Model.findOne({});
    res.status(200).json({ success: true, rule: rule || {} }); // Return empty object if none found
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch rule: " + error.message,
    });
  }
};

exports.saveJustInRule = saveRuleConfig(JustInRule);
exports.getJustInRule = getRuleConfiguration(JustInRule);

exports.saveBestSellerRule = saveRuleConfig(BestSellerRule);
exports.getBestSellerRule = getRuleConfiguration(BestSellerRule);

exports.saveLimitedUnitsRule = saveRuleConfig(LimitedUnitsRule);
exports.getLimitedUnitsRule = getRuleConfiguration(LimitedUnitsRule);

exports.saveMisspeltTagsRule = saveRuleConfig(MisspeltTagsRule);
exports.getMisspeltTagsRule = getRuleConfiguration(MisspeltTagsRule);

exports.saveAiSuggestedTagsRule = saveRuleConfig(AiSuggestedTagsRule);
exports.getAiSuggestedTagsRule = getRuleConfiguration(AiSuggestedTagsRule);

//  controller for Generate Tags Now
exports.generateAiTagsNow = async (req, res) => {
  try {
    // 1. Fetch the AI Rule configuration
    const rule = await AiSuggestedTagsRule.findOne({ isDraft: true });
    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "AI Tagging rule configuration not found.",
      });
    }
    const mockGeneratedTags = [
      "AI Tag: electronics",
      "AI Tag: fitness",
      "AI Tag: accessories",
    ];

    const updatedRule = await AiSuggestedTagsRule.findByIdAndUpdate(
      rule._id,
      {
        aiGeneratedTags: mockGeneratedTags,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "AI tags generated successfully.",
      rule: updatedRule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate AI tags: " + error.message,
    });
  }
};

exports.runJustInTagging = async () => {
  try {
    const rule = await JustInRule.findOne({ isDraft: false });
    if (!rule) return { success: false, message: "Just In Rule not active." };

    const cutoffDate = new Date();
    cutoffDate.setDate(
      cutoffDate.getDate() - rule.productsPublishedInLastXDays
    );

    const recentProducts = await Product.find({
      publishedAt: { $gte: cutoffDate },
      tags: { $ne: rule.tagName },
    });

    console.log(
      `Just In Rule: Found ${
        recentProducts.length
      } products to tag since ${cutoffDate.toISOString()}`
    );

    for (const product of recentProducts) {
      try {
        await applyTagToProduct(product._id, rule.tagName);
      } catch (tagError) {
        console.error(
          `Failed to apply tag ${rule.tagName} to product ${product._id}: ${tagError.message}`
        );
      }
    }

    if (rule.autoRemoveTag) {
      const removalCutoffDate = new Date();
      removalCutoffDate.setDate(
        removalCutoffDate.getDate() -
          (rule.productsPublishedInLastXDays + rule.autoRemoveAfterDays)
      );

      const productsToRemoveTag = await Product.find({
        publishedAt: { $lt: removalCutoffDate },
        tags: rule.tagName,
      });

      for (const product of productsToRemoveTag) {
        try {
          await removeTagFromProduct(product._id, rule.tagName);
        } catch (removeError) {
          console.error(
            `Failed to remove tag ${rule.tagName} from product ${product._id}: ${removeError.message}`
          );
        }
      }
    }

    return {
      success: true,
      message: `${recentProducts.length} products tagged as '${rule.tagName}'.`,
    };
  } catch (error) {
    console.error(
      "FATAL Error running Just In tagging:",
      error.message,
      error.stack
    );
    return {
      success: false,
      message: "Just In tagging failed. Check server logs for details.",
    };
  }
};

exports.runLimitedUnitsTagging = async () => {
  try {
    const rule = await LimitedUnitsRule.findOne({ isDraft: false });
    if (!rule)
      return { success: false, message: "Limited Units Rule not active." };

    const threshold = rule.inventoryThreshold;
    const tagName = rule.tagName;

    const lowStockProducts = await Product.find({ stock: { $lte: threshold } });
    for (const product of lowStockProducts) {
      await applyTagToProduct(product._id, tagName);
    }

    if (rule.autoRemoveTag) {
      const replenishedProducts = await Product.find({
        stock: { $gt: threshold },
        tags: tagName,
      });
      for (const product of replenishedProducts) {
        await removeTagFromProduct(product._id, tagName);
      }
    }

    return { success: true, message: "Limited Units tagging completed." };
  } catch (error) {
    console.error("Error running Limited Units tagging:", error.message);
    return { success: false, message: "Limited Units tagging failed." };
  }
};

exports.runBestSellerTagging = async () => {
  try {
    const rule = await BestSellerRule.findOne({ isDraft: false });
    if (!rule)
      return { success: false, message: "Best Seller Rule not active." };

    const topSellingProductsMock = await Product.find()
      .sort({ stock: -1 })
      .limit(rule.topXSoldProducts);

    await Product.updateMany(
      { tags: rule.tagName },
      { $pull: { tags: rule.tagName } }
    );

    for (const product of topSellingProductsMock) {
      await applyTagToProduct(product._id, rule.tagName);
    }

    return {
      success: true,
      message: `Best Seller tagging completed for ${topSellingProductsMock.length} products.`,
    };
  } catch (error) {
    console.error("Error running Best Seller tagging:", error.message);
    return { success: false, message: "Best Seller tagging failed." };
  }
};
