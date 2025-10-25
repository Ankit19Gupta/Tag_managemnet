const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");

router
  .route("/")
  .get(collectionController.getCollections)
  .post(collectionController.createCollection);

router
  .route("/:id")
  .get(collectionController.getCollections)
  .put(collectionController.updateCollection)
  .delete(collectionController.deleteCollection);

module.exports = router;
