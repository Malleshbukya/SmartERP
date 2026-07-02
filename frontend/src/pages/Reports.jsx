import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

import ProfitLoss from "../components/ProfitLoss";
import BalanceSheet from "../components/BalanceSheet";
import StockReport from "../components/StockReport";
import PurchaseReport from "../components/PurchaseReport";
import SalesReport from "../components/SalesReport";
import GSTReport from "../components/GSTReport";

function Reports() {
  const [activeReport, setActiveReport] = useState("profit");

  // Download PDF
  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/export/pdf",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "SmartERP_Report.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.log(error);
      alert("Failed to download PDF");
    }
  };

  // Download Excel
  const downloadExcel = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/excel/sales",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download Excel");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "SalesReport.xlsx";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.log(error);
      alert("Failed to download Excel");
    }
  };

  return (
    <DashboardLayout>
      <h1>Reports</h1>

      {/* Download Buttons */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={downloadPDF}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📄 Download PDF
        </button>

        <button
          onClick={downloadExcel}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📊 Download Excel
        </button>
      </div>

      {/* Report Navigation */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setActiveReport("profit")}>
          📈 Profit & Loss
        </button>

        <button onClick={() => setActiveReport("balance")}>
          📊 Balance Sheet
        </button>

        <button onClick={() => setActiveReport("stock")}>
          📦 Stock Report
        </button>

        <button onClick={() => setActiveReport("purchase")}>
          🛒 Purchase Report
        </button>

        <button onClick={() => setActiveReport("sales")}>
          💰 Sales Report
        </button>

        <button onClick={() => setActiveReport("gst")}>
          🧾 GST Report
        </button>
      </div>

      {activeReport === "profit" && <ProfitLoss />}

      {activeReport === "balance" && <BalanceSheet />}

      {activeReport === "stock" && <StockReport />}

      {activeReport === "purchase" && <PurchaseReport />}

      {activeReport === "sales" && <SalesReport />}

      {activeReport === "gst" && <GSTReport />}
    </DashboardLayout>
  );
}

export default Reports;