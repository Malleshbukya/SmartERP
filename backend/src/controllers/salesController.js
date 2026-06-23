const prisma = require("../config/prismaClient");

const createSalesVoucher = async (req, res) => {
  try {
    const {
      invoiceNo,
      customerName,
      itemName,
      quantity,
      rate,
      companyId,
    } = req.body;

    const amount = quantity * rate;

    const voucher = await prisma.salesVoucher.create({
      data: {
        invoiceNo,
        customerName,
        itemName,
        quantity,
        rate,
        amount,
        companyId,
      },
    });

    res.status(201).json({
      message: "Sales Voucher Created",
      voucher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getSalesVouchers = async (req, res) => {
  try {
    const { companyId } = req.query;

    const vouchers = await prisma.salesVoucher.findMany({
      where: {
        companyId: Number(companyId),
      },
    });

    res.json(vouchers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createSalesVoucher,
  getSalesVouchers,
};