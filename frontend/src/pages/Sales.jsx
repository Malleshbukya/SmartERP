import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import SalesForm from "../components/SalesForm";
import apiClient from "../api/apiClient";

function Sales() {
  const [sales, setSales] = useState([]);
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
        fetchSales(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSales = async (id) => {
    try {
      const response = await apiClient.get(
        `/sales?companyId=${id}`
      );

      setSales(response.data);
      setCompanyId(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h1>Sales Management</h1>

      <SalesForm fetchSales={fetchSales} />

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
                  {new Date(
                    sale.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>{sale.customerName}</td>

                <td>{sale.itemName}</td>

                <td>{sale.quantity}</td>

                <td>{sale.rate}</td>

                <td>{sale.amount}</td>
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
                No Sales Vouchers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Sales;