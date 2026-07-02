const express = require("express");

const {
  createStockItem,
  getStockItems,
  updateStockItem,
  deleteStockItem,
} = require("../controllers/stockController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Stock Item
router.post(
  "/create",
  authMiddleware,
  createStockItem
);

// Get Stock Items
router.get(
  "/",
  authMiddleware,
  getStockItems
);

// Update Stock Item
router.put(
  "/:id",
  authMiddleware,
  updateStockItem
);

// Delete Stock Item
router.delete(
  "/:id",
  authMiddleware,
  deleteStockItem
);

module.exports = router;