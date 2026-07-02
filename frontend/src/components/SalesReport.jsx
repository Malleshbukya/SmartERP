import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function SalesReport() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await apiClient.get("/reports/sales");
      setSales(response.data);
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
      <h2>💰 Sales Report</h2>

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
            <th>Date</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>

                <td>
                  {new Date(sale.date).toLocaleDateString()}
                </td>

                <td>{sale.customerName}</td>

                <td>{sale.itemName}</td>

                <td>{sale.quantity}</td>

                <td>₹ {sale.rate}</td>

                <td>₹ {sale.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Sales Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SalesReport;