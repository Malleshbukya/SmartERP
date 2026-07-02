import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function PurchaseReport() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await apiClient.get("/reports/purchase");
      setPurchases(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Purchase Report</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Supplier</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.id}</td>
              <td>{new Date(purchase.date).toLocaleDateString()}</td>
              <td>{purchase.supplierName}</td>
              <td>{purchase.itemName}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.rate}</td>
              <td>{purchase.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseReport;