const prisma = require("../config/prismaClient");

// Create Sales Voucher
const createSalesVoucher = async (req, res) => {
  try {
    const {
      companyId,
      ledgerId,
      stockItemId,
      quantity,
      rate,
    } = req.body;

    if (
      !companyId ||
      !ledgerId ||
      !stockItemId ||
      !quantity ||
      !rate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Get Customer Ledger
   // Check Company Ownership
const company = await prisma.company.findFirst({
  where: {
    id: Number(companyId),
    userId: req.user.id,
  },
});

if (!company) {
  return res.status(404).json({
    message: "Company not found",
  });
}

// Get Customer Ledger
const ledger = await prisma.ledger.findFirst({
  where: {
    id: Number(ledgerId),
    companyId: Number(companyId),
    company: {
      userId: req.user.id,
    },
  },
});

    if (!ledger) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Get Stock Item
    // Get Stock Item
const stock = await prisma.stockItem.findFirst({
  where: {
    id: Number(stockItemId),
    companyId: Number(companyId),
    company: {
      userId: req.user.id,
    },
  },
});

    if (!stock) {
      return res.status(404).json({
        message: "Stock Item not found",
      });
    }

    if (stock.openingStock < Number(quantity)) {
      return res.status(400).json({
        message: "Insufficient Stock",
      });
    }

    const amount =
      Number(quantity) * Number(rate);

    const sale = await prisma.salesVoucher.create({
      data: {
        invoiceNo: "SAL-" + Date.now(),
        customerName: ledger.name,
        itemName: stock.itemName,
        quantity: Number(quantity),
        rate: Number(rate),
        amount,
        companyId: Number(companyId),
      },
    });

    // Reduce Stock
    await prisma.stockItem.update({
      where: {
        id: Number(stockItemId),
      },
      data: {
        openingStock:
          stock.openingStock - Number(quantity),

        stockValue:
          (stock.openingStock - Number(quantity)) *
          stock.rate,
      },
    });

    res.status(201).json({
      message: "Sales Voucher Created Successfully",
      sale,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Sales
const getSalesVouchers = async (req, res) => {
  try {
    const { companyId } = req.query;

    // Verify Company Ownership
const company = await prisma.company.findFirst({
  where: {
    id: Number(companyId),
    userId: req.user.id,
  },
});

if (!company) {
  return res.json([]);
}

const sales = await prisma.salesVoucher.findMany({
  where: {
    companyId: Number(companyId),
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

module.exports = {
  createSalesVoucher,
  getSalesVouchers,
};