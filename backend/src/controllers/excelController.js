const ExcelJS = require("exceljs");
const prisma = require("../config/prismaClient");

const exportExcel = async (req, res) => {
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

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sales Report");

    worksheet.columns = [
      { header: "Invoice", key: "invoiceNo", width: 20 },
      { header: "Customer", key: "customerName", width: 25 },
      { header: "Item", key: "itemName", width: 20 },
      { header: "Quantity", key: "quantity", width: 15 },
      { header: "Rate", key: "rate", width: 15 },
      { header: "Amount", key: "amount", width: 20 },
    ];

    sales.forEach((sale) => {
      worksheet.addRow(sale);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=SalesReport.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  exportExcel,
};