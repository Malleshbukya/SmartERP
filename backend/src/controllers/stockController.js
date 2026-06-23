const prisma = require("../config/prismaClient");

const createStockItem = async (req, res) => {
  try {
    const {
      itemName,
      unit,
      rate,
      openingStock,
      companyId,
    } = req.body;

    const stockValue = rate * openingStock;

    const item = await prisma.stockItem.create({
      data: {
        itemName,
        unit,
        rate,
        openingStock,
        stockValue,
        companyId,
      },
    });

    res.status(201).json({
      message: "Stock Item Created Successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getStockItems = async (req, res) => {
  try {
    const { companyId } = req.query;

    const items = await prisma.stockItem.findMany({
      where: {
        companyId: Number(companyId),
      },
    });

    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createStockItem,
  getStockItems,
};