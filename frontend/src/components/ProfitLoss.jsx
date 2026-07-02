import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function ProfitLoss() {
  const [report, setReport] = useState({
    totalPurchase: 0,
    totalSales: 0,
    profit: 0,
  });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await apiClient.get(
        "/reports/profit-loss"
      );

      setReport(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>📈 Profit & Loss Report</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr>
            <td>Total Purchase</td>
            <td>₹ {report.totalPurchase}</td>
          </tr>

          <tr>
            <td>Total Sales</td>
            <td>₹ {report.totalSales}</td>
          </tr>

          <tr>
            <td>
              <strong>Profit</strong>
            </td>
            <td>
              <strong>
                ₹ {report.profit}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProfitLoss;