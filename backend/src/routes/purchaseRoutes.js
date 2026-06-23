const express = require("express");

const {
  createPurchaseVoucher,
} = require("../controllers/purchaseController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createPurchaseVoucher
);

module.exports = router;