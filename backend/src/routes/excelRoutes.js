const express = require("express");

const { exportExcel } = require("../controllers/excelController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/sales",
  authMiddleware,
  exportExcel
);

module.exports = router;