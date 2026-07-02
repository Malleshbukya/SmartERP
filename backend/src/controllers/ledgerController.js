const prisma = require("../config/prismaClient");

// Create Ledger
const createLedger = async (req, res) => {
  try {
    const { name, type, openingBal, companyId } = req.body;

    if (
      !name?.trim() ||
      !type?.trim() ||
      openingBal === undefined ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingLedger = await prisma.ledger.findFirst({
      where: {
        name,
        companyId: Number(companyId),
      },
    });

    if (existingLedger) {
      return res.status(400).json({
        message: "Ledger already exists",
      });
    }

    // Check whether the company belongs to the logged-in user
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

const ledger = await prisma.ledger.create({
  data: {
    name,
    type,
    openingBal: Number(openingBal),
    companyId: Number(companyId),
  },
});

    res.status(201).json({
      message: "Ledger created successfully",
      ledger,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Ledgers
const getLedgers = async (req, res) => {
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

const ledgers = await prisma.ledger.findMany({
  where: {
    companyId: Number(companyId),
  },
  orderBy: {
    id: "asc",
  },
});

    res.json(ledgers);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Ledger
const updateLedger = async (req, res) => {
  try {
    console.log("===== UPDATE LEDGER =====");
    console.log("Params:", req.params);
    console.log("Body:", req.body);

    const { id } = req.params;
    const { name, type, openingBal } = req.body;

    const ledger = await prisma.ledger.findFirst({
  where: {
    id: Number(id),
    company: {
      userId: req.user.id,
    },
  },
});

    console.log("Found Ledger:", ledger);

    if (!ledger) {
      return res.status(404).json({
        message: "Ledger not found",
      });
    }

    const updatedLedger = await prisma.ledger.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        type,
        openingBal: Number(openingBal),
      },
    });

    console.log("Updated Ledger:", updatedLedger);

    res.json({
      message: "Ledger updated successfully",
      ledger: updatedLedger,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Ledger
const deleteLedger = async (req, res) => {
  try {
    const { id } = req.params;

  const ledger = await prisma.ledger.findFirst({
  where: {
    id: Number(id),
    company: {
      userId: req.user.id,
    },
  },
});

if (!ledger) {
  return res.status(404).json({
    message: "Ledger not found",
  });
}

await prisma.ledger.delete({
  where: {
    id: Number(id),
  },
});

    res.json({
      message: "Ledger deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createLedger,
  getLedgers,
  updateLedger,
  deleteLedger,
};