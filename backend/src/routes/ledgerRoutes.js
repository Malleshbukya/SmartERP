const express = require("express");

const {
  createLedger,
  getLedgers,
} = require("../controllers/ledgerController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createLedger
);

router.get(
  "/",
  authMiddleware,
  getLedgers
);

module.exports = router;