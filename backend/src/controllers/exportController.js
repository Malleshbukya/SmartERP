const PDFDocument = require("pdfkit");
const prisma = require("../config/prismaClient");

const exportPDF = async (req, res) => {
  try {
    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="SmartERP_Report.pdf"'
    );

    doc.pipe(res);

    // ==========================
    // Title
    // ==========================

    doc
      .fontSize(22)
      .text("SmartERP Reports", {
        align: "center",
      });

    doc.moveDown();

    // ==========================
    // Dashboard Summary
    // ==========================

    const companyCount = await prisma.company.count();

    const ledgerCount = await prisma.ledger.count();

    const stockCount = await prisma.stockItem.count();

    const purchaseCount =
      await prisma.purchaseVoucher.count();

    const salesCount =
      await prisma.salesVoucher.count();

    doc
      .fontSize(18)
      .text("Dashboard Summary");

    doc.moveDown(0.5);

    doc.text(`Companies : ${companyCount}`);
    doc.text(`Ledgers : ${ledgerCount}`);
    doc.text(`Stock Items : ${stockCount}`);
    doc.text(`Purchases : ${purchaseCount}`);
    doc.text(`Sales : ${salesCount}`);

    doc.moveDown();

    // ==========================
    // Profit & Loss
    // ==========================

    const purchase =
      await prisma.purchaseVoucher.aggregate({
        _sum: {
          amount: true,
        },
      });

    const sales =
      await prisma.salesVoucher.aggregate({
        _sum: {
          amount: true,
        },
      });

    const purchaseAmount =
      purchase._sum.amount || 0;

    const salesAmount =
      sales._sum.amount || 0;

    doc
      .fontSize(18)
      .text("Profit & Loss");

    doc.moveDown(0.5);

    doc.text(`Purchase : ₹${purchaseAmount}`);
    doc.text(`Sales : ₹${salesAmount}`);
    doc.text(
      `Profit : ₹${salesAmount - purchaseAmount}`
    );

    doc.moveDown();

    // ==========================
    // Balance Sheet
    // ==========================

    const stock =
      await prisma.stockItem.aggregate({
        _sum: {
          stockValue: true,
        },
      });

    doc
      .fontSize(18)
      .text("Balance Sheet");

    doc.moveDown(0.5);

    doc.text(
      `Assets : ₹${stock._sum.stockValue || 0}`
    );

    doc.text(
      `Liabilities : ₹${purchaseAmount}`
    );

    doc.text(
      `Capital : ₹${salesAmount - purchaseAmount}`
    );

    doc.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  exportPDF,
};