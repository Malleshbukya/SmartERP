const prisma = require("../config/prismaClient");

// Create Purchase Voucher
const createPurchaseVoucher = async (req, res) => {
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

    // Get Supplier
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

// Get Supplier
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
        message: "Supplier not found",
      });
    }

    // Get Stock Item
    // Get Stock Item
const stockItem = await prisma.stockItem.findFirst({
  where: {
    id: Number(stockItemId),
    companyId: Number(companyId),
    company: {
      userId: req.user.id,
    },
  },
});

    if (!stockItem) {
      return res.status(404).json({
        message: "Stock Item not found",
      });
    }

    const amount = Number(quantity) * Number(rate);

    const purchase = await prisma.purchaseVoucher.create({
      data: {
        invoiceNo: "PUR-" + Date.now(),
        supplierName: ledger.name,
        itemName: stockItem.itemName,
        quantity: Number(quantity),
        rate: Number(rate),
        amount,
        companyId: Number(companyId),
      },
    });

    // Update Stock
    await prisma.stockItem.update({
      where: {
        id: Number(stockItemId),
      },
      data: {
        openingStock:
          stockItem.openingStock + Number(quantity),

        stockValue:
          (stockItem.openingStock + Number(quantity)) *
          stockItem.rate,
      },
    });

    res.status(201).json({
      message: "Purchase Voucher Created Successfully",
      purchase,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Purchase Vouchers
const getPurchaseVouchers = async (req, res) => {
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

const purchases =
  await prisma.purchaseVoucher.findMany({
    where: {
      companyId: Number(companyId),
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

// Update Purchase Voucher
const updatePurchaseVoucher = async (req, res) => {
  res.json({
    message: "Update feature will be added later",
  });
};

// Delete Purchase Voucher
const deletePurchaseVoucher = async (req, res) => {
  try {
    const { id } = req.params;

    const purchase = await prisma.purchaseVoucher.findFirst({
  where: {
    id: Number(id),
    company: {
      userId: req.user.id,
    },
  },
});

if (!purchase) {
  return res.status(404).json({
    message: "Purchase Voucher not found",
  });
}

await prisma.purchaseVoucher.delete({
  where: {
    id: Number(id),
  },
});

    res.json({
      message: "Purchase Deleted Successfully",
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
  getPurchaseVouchers,
  updatePurchaseVoucher,
  deletePurchaseVoucher,
};