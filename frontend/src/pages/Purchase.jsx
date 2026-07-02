import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import PurchaseForm from "../components/PurchaseForm";
import apiClient from "../api/apiClient";

function Purchase() {
  const [purchases, setPurchases] = useState([]);
  const [companyId, setCompanyId] = useState("");

  useEffect(() => {
    loadDefaultCompany();
  }, []);

  const loadDefaultCompany = async () => {
    try {
      const response = await apiClient.get("/company");

      if (response.data.length > 0) {
        const id = response.data[0].id;
        setCompanyId(id);
        fetchPurchases(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPurchases = async (id) => {
    try {
      const response = await apiClient.get(
        `/purchase?companyId=${id}`
      );

      setPurchases(response.data);
      setCompanyId(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h1>Purchase Management</h1>

      <PurchaseForm fetchPurchases={fetchPurchases} />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
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
            <th>Supplier</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {purchases.length > 0 ? (
            purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.id}</td>

                <td>
                  {new Date(
                    purchase.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>{purchase.supplierName}</td>

                <td>{purchase.itemName}</td>

                <td>{purchase.quantity}</td>

                <td>{purchase.rate}</td>

                <td>{purchase.amount}</td>
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
                No Purchase Vouchers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Purchase;