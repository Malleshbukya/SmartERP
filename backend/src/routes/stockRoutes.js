const express = require("express");

const {
  createStockItem,
  getStockItems,
} = require("../controllers/stockController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createStockItem
);

router.get(
  "/",
  authMiddleware,
  getStockItems
);

module.exports = router;