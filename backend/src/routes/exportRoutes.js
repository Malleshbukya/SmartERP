const express = require("express");

const {
  exportPDF,
} = require("../controllers/exportController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Export PDF
router.get(
  "/pdf",
  authMiddleware,
  exportPDF
);

module.exports = router;