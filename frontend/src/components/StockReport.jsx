import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function StockReport() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStockReport();
  }, []);

  const fetchStockReport = async () => {
    try {
      const response = await apiClient.get("/reports/stock");
      setStocks(response.data);
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
      <h2>📦 Stock Report</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead
          style={{
            background: "#1e293b",
            color: "white",
          }}
        >
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Opening Stock</th>
            <th>Stock Value</th>
          </tr>
        </thead>

        <tbody>
          {stocks.length > 0 ? (
            stocks.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemName}</td>
                <td>{item.unit}</td>
                <td>₹ {item.rate}</td>
                <td>{item.openingStock}</td>
                <td>₹ {item.stockValue}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Stock Items Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockReport;