import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function BalanceSheet() {
  const [report, setReport] = useState({
    assets: 0,
    liabilities: 0,
    capital: 0,
  });

  useEffect(() => {
    fetchBalanceSheet();
  }, []);

  const fetchBalanceSheet = async () => {
    try {
      const response = await apiClient.get(
        "/reports/balance-sheet"
      );

      setReport(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>📊 Balance Sheet</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <tbody>
          <tr>
            <td>Total Assets</td>
            <td>₹ {report.assets}</td>
          </tr>

          <tr>
            <td>Total Liabilities</td>
            <td>₹ {report.liabilities}</td>
          </tr>

          <tr>
            <td><strong>Capital</strong></td>
            <td><strong>₹ {report.capital}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BalanceSheet;