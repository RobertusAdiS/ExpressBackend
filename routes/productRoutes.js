const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Function to set up product routes
const setProductRoutes = (app) => {
  const router = express.Router();

  // Route to create a new product
  router.post("/", createProduct);

  // Route to get all products
  router.get("/", getProducts);

  // Route to get a product by ID
  router.get("/:id", getProductById);

  // Route to update a product by ID
  router.put("/:id", updateProduct);

  // Route to delete a product by ID
  router.delete("/:id", deleteProduct);

  // Use the router for all routes starting with /api/products
  app.use("/api/products", router);
};

module.exports = setProductRoutes;
