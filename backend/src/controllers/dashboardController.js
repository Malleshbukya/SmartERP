const prisma = require("../config/prismaClient");

const getDashboard = async (req, res) => {
  try {
    // Logged-in user
    const userId = req.user.id;

    // Get only this user's companies
    const companies = await prisma.company.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const companyIds = companies.map((company) => company.id);

    // Dashboard Counts
    const companyCount = companies.length;

    const ledgerCount = await prisma.ledger.count({
      where: {
        companyId: {
          in: companyIds,
        },
      },
    });

    const stockCount = await prisma.stockItem.count({
      where: {
        companyId: {
          in: companyIds,
        },
      },
    });

    const purchaseCount = await prisma.purchaseVoucher.count({
      where: {
        companyId: {
          in: companyIds,
        },
      },
    });

    const salesCount = await prisma.salesVoucher.count({
      where: {
        companyId: {
          in: companyIds,
        },
      },
    });

    const stockValue = await prisma.stockItem.aggregate({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      _sum: {
        stockValue: true,
      },
    });

    res.json({
      companyCount,
      ledgerCount,
      stockCount,
      purchaseCount,
      salesCount,
      inventoryValue: stockValue._sum.stockValue || 0,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboard,
};