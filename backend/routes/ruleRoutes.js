const express = require("express");
const router = express.Router();
const ruleControllers = require("../controllers/ruleControllers");

router
  .route("/just-in")
  .get(ruleControllers.getJustInRule)
  .post(ruleControllers.saveJustInRule);
router.put("/just-in/:id", ruleControllers.saveJustInRule);

router
  .route("/best-seller")
  .get(ruleControllers.getBestSellerRule)
  .post(ruleControllers.saveBestSellerRule);
router.put("/best-seller/:id", ruleControllers.saveBestSellerRule);

router
  .route("/limited-units")
  .get(ruleControllers.getLimitedUnitsRule)
  .post(ruleControllers.saveLimitedUnitsRule);
router.put("/limited-units/:id", ruleControllers.saveLimitedUnitsRule);

router
  .route("/misspelt-tags")
  .get(ruleControllers.getMisspeltTagsRule)
  .post(ruleControllers.saveMisspeltTagsRule);
router.put("/misspelt-tags/:id", ruleControllers.saveMisspeltTagsRule);

router
  .route("/ai-tags")
  .get(ruleControllers.getAiSuggestedTagsRule)
  .post(ruleControllers.saveAiSuggestedTagsRule);
router.put("/ai-tags/:id", ruleControllers.saveAiSuggestedTagsRule);

router.post("/ai-tags/generate", ruleControllers.generateAiTagsNow);

module.exports = router;
