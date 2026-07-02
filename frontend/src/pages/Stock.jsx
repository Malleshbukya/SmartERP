import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import StockForm from "../components/StockForm";
import EditStockModal from "../components/EditStockModal";
import apiClient from "../api/apiClient";

function Stock() {
  const [stockItems, setStockItems] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadDefaultCompany();
  }, []);

  const loadDefaultCompany = async () => {
    try {
      const response = await apiClient.get("/company");

      if (response.data.length > 0) {
        const id = response.data[0].id;
        setCompanyId(id);
        fetchStockItems(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStockItems = async (id) => {
    try {
      const response = await apiClient.get(
        `/stock?companyId=${id}`
      );

      setStockItems(response.data);
      setCompanyId(id);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStock = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this stock item?"
    );

    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/stock/${id}`);

      alert("Stock Deleted Successfully");

      fetchStockItems(companyId);
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <DashboardLayout>
      <h1>Stock Management</h1>

      <StockForm fetchStockItems={fetchStockItems} />

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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {stockItems.length > 0 ? (
            stockItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemName}</td>
                <td>{item.unit}</td>
                <td>{item.rate}</td>
                <td>{item.openingStock}</td>
                <td>{item.stockValue}</td>

                <td>
                  <button
                    onClick={() => setSelectedItem(item)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStock(item.id)}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
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
                No Stock Items Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedItem && (
        <EditStockModal
          item={selectedItem}
          companyId={companyId}
          fetchStockItems={fetchStockItems}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </DashboardLayout>
  );
}

export default Stock;