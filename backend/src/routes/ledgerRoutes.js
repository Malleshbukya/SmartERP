const express = require("express");

const {
  createLedger,
  getLedgers,
  updateLedger,
  deleteLedger,
} = require("../controllers/ledgerController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Ledger
router.post(
  "/create",
  authMiddleware,
  createLedger
);

// Get Ledgers
router.get(
  "/",
  authMiddleware,
  getLedgers
);

// Update Ledger
router.put(
  "/:id",
  authMiddleware,
  updateLedger
);

// Delete Ledger
router.delete(
  "/:id",
  authMiddleware,
  deleteLedger
);

module.exports = router;