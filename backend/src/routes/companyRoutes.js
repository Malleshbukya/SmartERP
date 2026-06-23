const express = require("express");

const {
  createCompany,
  getCompanies,
} = require("../controllers/companyController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createCompany
);

router.get(
  "/",
  authMiddleware,
  getCompanies
);

module.exports = router;