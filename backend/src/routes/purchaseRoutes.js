const express = require("express");

const {
  createPurchaseVoucher,
  getPurchaseVouchers,
  updatePurchaseVoucher,
  deletePurchaseVoucher,
} = require("../controllers/purchaseController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Purchase Voucher
router.post(
  "/create",
  authMiddleware,
  createPurchaseVoucher
);

// Get Purchase Vouchers
router.get(
  "/",
  authMiddleware,
  getPurchaseVouchers
);

// Update Purchase Voucher
router.put(
  "/:id",
  authMiddleware,
  updatePurchaseVoucher
);

// Delete Purchase Voucher
router.delete(
  "/:id",
  authMiddleware,
  deletePurchaseVoucher
);

module.exports = router;