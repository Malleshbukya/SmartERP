const prisma = require("../config/prismaClient");

const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      gstNumber,
      address,
      state,
      financialYear,
    } = req.body;

    const userId = req.user.id;

    const companyCount = await prisma.company.count({
      where: {
        userId,
      },
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

const getCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.json(companies);
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
};