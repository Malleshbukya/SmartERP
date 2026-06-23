const prisma = require("../config/prismaClient");

const createPurchaseVoucher = async (req, res) => {
  try {
    const {
      invoiceNo,
      supplierName,
      itemName,
      quantity,
      rate,
      companyId,
    } = req.body;

    const amount = quantity * rate;

    const stockItem = await prisma.stockItem.findFirst({
      where: {
        itemName,
        companyId,
      },
    });

    if (!stockItem) {
      return res.status(404).json({
        message: "Stock Item Not Found",
      });
    }

    await prisma.stockItem.update({
      where: {
        id: stockItem.id,
      },
      data: {
        openingStock:
          stockItem.openingStock + quantity,

        stockValue:
          (stockItem.openingStock + quantity) *
          stockItem.rate,
      },
    });

    const voucher = await prisma.purchaseVoucher.create({
      data: {
        invoiceNo,
        supplierName,
        itemName,
        quantity,
        rate,
        amount,
        companyId,
      },
    });

    res.status(201).json({
      message: "Purchase Voucher Created",
      voucher,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createPurchaseVoucher,
};