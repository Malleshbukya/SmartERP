const prisma = require("../config/prismaClient");

// Create Company
const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      gstNumber,
      address,
      state,
      financialYear,
    } = req.body;

    if (
      !companyName?.trim() ||
      !gstNumber?.trim() ||
      !address?.trim() ||
      !state?.trim() ||
      !financialYear?.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userId = req.user.id;

    const companyCount = await prisma.company.count({
      where: { userId },
    });

    if (companyCount >= 5) {
      return res.status(400).json({
        message: "Maximum 5 companies allowed",
      });
    }

    const company = await prisma.company.create({
      data: {
        companyName,
        gstNumber,
        address,
        state,
        financialYear,
        userId,
      },
    });

    res.status(201).json({
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Companies
const getCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ✅ Update Company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      companyName,
      gstNumber,
      address,
      state,
      financialYear,
    } = req.body;

    const company = await prisma.company.findFirst({
      where: {
        id: Number(id),
        userId: req.user.id,
      },
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    const updatedCompany = await prisma.company.update({
      where: {
        id: Number(id),
      },
      data: {
        companyName,
        gstNumber,
        address,
        state,
        financialYear,
      },
    });

    res.status(200).json({
      message: "Company Updated Successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Company
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findFirst({
      where: {
        id: Number(id),
        userId: req.user.id,
      },
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    await prisma.company.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
};