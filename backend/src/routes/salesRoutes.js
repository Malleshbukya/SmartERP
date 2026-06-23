const express = require("express");

const {
  createSalesVoucher,
  getSalesVouchers,
} = require("../controllers/salesController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createSalesVoucher
);

router.get(
  "/",
  authMiddleware,
  getSalesVouchers
);

module.exports = router;