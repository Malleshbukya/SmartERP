const express = require("express");

const {
  getProfitLoss,
  getBalanceSheet,
  getStockReport,
  getPurchaseReport,
  getSalesReport,
  getGSTReport,
} = require("../controllers/reportController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
====================================
Reports Routes
====================================
*/

// Profit & Loss Report
router.get(
  "/profit-loss",
  authMiddleware,
  getProfitLoss
);

// Balance Sheet Report
router.get(
  "/balance-sheet",
  authMiddleware,
  getBalanceSheet
);

// Stock Report
router.get(
  "/stock",
  authMiddleware,
  getStockReport
);

// Purchase Report
router.get(
  "/purchase",
  authMiddleware,
  getPurchaseReport
);

// Sales Report
router.get(
  "/sales",
  authMiddleware,
  getSalesReport
);

// GST Report
router.get(
  "/gst",
  authMiddleware,
  getGSTReport
);

module.exports = router;