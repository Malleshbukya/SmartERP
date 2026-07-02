const prisma = require("../config/prismaClient");

// Profit & Loss Report
const getProfitLoss = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
      },
    });

    const companyIds = companies.map(c => c.id);

    const totalPurchase = await prisma.purchaseVoucher.aggregate({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalSales = await prisma.salesVoucher.aggregate({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const purchase = totalPurchase._sum.amount || 0;
    const sales = totalSales._sum.amount || 0;

    res.json({
      totalPurchase: purchase,
      totalSales: sales,
      profit: sales - purchase,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Balance Sheet Report
const getBalanceSheet = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
      },
    });

    const companyIds = companies.map(c => c.id);

    const assets = await prisma.stockItem.aggregate({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      _sum: {
        stockValue: true,
      },
    });

    const purchase = await prisma.purchaseVoucher.aggregate({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const sales = await prisma.salesVoucher.aggregate({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalAssets = assets._sum.stockValue || 0;
    const totalPurchase = purchase._sum.amount || 0;
    const totalSales = sales._sum.amount || 0;

    res.json({
      assets: totalAssets,
      liabilities: totalPurchase,
      capital: totalSales - totalPurchase,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Stock Report
const getStockReport = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
      },
    });

    const companyIds = companies.map(c => c.id);

    const stockItems = await prisma.stockItem.findMany({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json(stockItems);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Purchase Report
const getPurchaseReport = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
      },
    });

    const companyIds = companies.map(c => c.id);

    const purchases = await prisma.purchaseVoucher.findMany({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(purchases);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Sales Report
const getSalesReport = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
      },
    });

    const companyIds = companies.map(c => c.id);

    const sales = await prisma.salesVoucher.findMany({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(sales);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GST Report
const getGSTReport = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
      },
    });

    const companyIds = companies.map(c => c.id);

    const purchase = await prisma.purchaseVoucher.aggregate({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const sales = await prisma.salesVoucher.aggregate({
      where: {
        companyId: {
          in: companyIds,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const purchaseAmount = purchase._sum.amount || 0;
    const salesAmount = sales._sum.amount || 0;

    const inputGST = purchaseAmount * 0.18;
    const outputGST = salesAmount * 0.18;
    const gstPayable = outputGST - inputGST;

    res.json({
      purchaseAmount,
      salesAmount,
      inputGST,
      outputGST,
      gstPayable,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfitLoss,
  getBalanceSheet,
  getStockReport,
  getPurchaseReport,
  getSalesReport,
  getGSTReport,
};