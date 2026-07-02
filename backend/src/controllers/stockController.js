const prisma = require("../config/prismaClient");

// Create Stock Item
const createStockItem = async (req, res) => {
  try {
    const {
      itemName,
      unit,
      rate,
      openingStock,
      companyId,
    } = req.body;


    console.log("Logged User:", req.user);
console.log("Company ID:", companyId);

    // Validation
    if (
      !itemName?.trim() ||
      !unit?.trim() ||
      rate === undefined ||
      openingStock === undefined ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Duplicate Item Check
    // Duplicate Item Check
const existingItem = await prisma.stockItem.findFirst({
  where: {
    itemName,
    companyId: Number(companyId),
  },
});

if (existingItem) {
  return res.status(400).json({
    message: "Stock Item already exists",
  });
}

// Check whether the company belongs to the logged-in user
const company = await prisma.company.findFirst({
  where: {
    id: Number(companyId),
    userId: req.user.id,
  },
});

console.log("Company:", company);

if (!company) {
  return res.status(404).json({
    message: "Company not found",
  });
}

const stockValue = Number(rate) * Number(openingStock);

const item = await prisma.stockItem.create({
  data: {
    itemName,
    unit,
    rate: Number(rate),
    openingStock: Number(openingStock),
    stockValue,
    companyId: Number(companyId),
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

// Get Stock Items
const getStockItems = async (req, res) => {
  try {
    const { companyId } = req.query;

    const company = await prisma.company.findFirst({
  where: {
    id: Number(companyId),
    userId: req.user.id,
  },
});

if (!company) {
  return res.json([]);
}

const items = await prisma.stockItem.findMany({
  where: {
    companyId: Number(companyId),
  },
  orderBy: {
    id: "asc",
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

// Update Stock Item
const updateStockItem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      itemName,
      unit,
      rate,
      openingStock,
    } = req.body;

    const item = await prisma.stockItem.findFirst({
  where: {
    id: Number(id),
    company: {
      userId: req.user.id,
    },
  },
});

    if (!item) {
      return res.status(404).json({
        message: "Stock Item not found",
      });
    }

    const stockValue =
      Number(rate) * Number(openingStock);

    const updatedItem =
      await prisma.stockItem.update({
        where: {
          id: Number(id),
        },
        data: {
          itemName,
          unit,
          rate: Number(rate),
          openingStock: Number(openingStock),
          stockValue,
        },
      });

    res.json({
      message: "Stock Updated Successfully",
      item: updatedItem,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Stock Item
const deleteStockItem = async (req, res) => {
  try {
    const { id } = req.params;

   const item = await prisma.stockItem.findFirst({
  where: {
    id: Number(id),
    company: {
      userId: req.user.id,
    },
  },
});

if (!item) {
  return res.status(404).json({
    message: "Stock Item not found",
  });
}

await prisma.stockItem.delete({
  where: {
    id: Number(id),
  },
});

    res.json({
      message: "Stock Deleted Successfully",
    });

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
  updateStockItem,
  deleteStockItem,
};