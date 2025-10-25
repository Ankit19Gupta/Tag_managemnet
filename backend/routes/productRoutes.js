const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/")
  .get(productController.getProducts)
  .post(upload.single("mainImage"), productController.createProduct);

router
  .route("/:id")
  .get(productController.getProductById)
  .put(upload.single("mainImage"), productController.updateProduct)
  .delete(productController.deleteProduct);

router.post("/trigger-tags", productController.triggerAllActiveTags);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");
// const multer = require("multer");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// router.get("/count/:tagName", productController.getProductsByTagCount);

// router
//   .route("/")
//   .get(productController.getProducts)
//   .post(upload.single("mainImage"), productController.createProduct);

// router
//   .route("/:id")
//   .get(productController.getProductById)
//   .put(upload.single("mainImage"), productController.updateProduct)
//   .delete(productController.deleteProduct);

// router.post("/trigger-tags", productController.triggerAllActiveTags);

// module.exports = router;
