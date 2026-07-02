import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function StockForm({ fetchStockItems }) {
  const [companies, setCompanies] = useState([]);

  const [itemName, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [rate, setRate] = useState("");
  const [openingStock, setOpeningStock] = useState("");
  const [companyId, setCompanyId] = useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await apiClient.get("/company");
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveStock = async () => {
    if (
      !itemName.trim() ||
      !unit ||
      !rate ||
      !openingStock ||
      !companyId
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await apiClient.post("/stock/create", {
        itemName,
        unit,
        rate,
        openingStock,
        companyId,
      });

      alert("Stock Item Added Successfully");

      setItemName("");
      setUnit("");
      setRate("");
      setOpeningStock("");
      setCompanyId("");

      fetchStockItems(companyId);
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed");
      }
    }
  };

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        color: "white",
      }}
    >
      <h2>Add Stock Item</h2>

      <input
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <br /><br />

      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="">Select Unit</option>
        <option>Pieces</option>
        <option>Kg</option>
        <option>Gram</option>
        <option>Litre</option>
        <option>Box</option>
        <option>Packet</option>
        <option>Dozen</option>
        <option>Meter</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Rate"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Opening Stock"
        value={openingStock}
        onChange={(e) => setOpeningStock(e.target.value)}
      />

      <br /><br />

      <select
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      >
        <option value="">Select Company</option>

        {companies.map((company) => (
          <option
            key={company.id}
            value={company.id}
          >
            {company.companyName}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={saveStock}>
        Save Stock
      </button>
    </div>
  );
}

export default StockForm;