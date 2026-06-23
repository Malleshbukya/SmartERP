const prisma = require("../config/prismaClient");

const createLedger = async (req, res) => {
  try {
    const {
      name,
      type,
      openingBal,
      companyId,
    } = req.body;

    const ledger = await prisma.ledger.create({
      data: {
        name,
        type,
        openingBal,
        companyId,
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

const getLedgers = async (req, res) => {
  try {
    const { companyId } = req.query;

    const ledgers = await prisma.ledger.findMany({
      where: {
        companyId: Number(companyId),
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

module.exports = {
  createLedger,
  getLedgers,
};