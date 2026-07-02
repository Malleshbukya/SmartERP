const express = require("express");

const {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Company
router.post(
  "/create",
  authMiddleware,
  createCompany
);

// Get Companies
router.get(
  "/",
  authMiddleware,
  getCompanies
);

// Update Company
router.put(
  "/:id",
  authMiddleware,
  updateCompany
);

// Delete Company
router.delete(
  "/:id",
  authMiddleware,
  deleteCompany
);

module.exports = router;