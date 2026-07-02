import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function EditStockModal({
  item,
  companyId,
  fetchStockItems,
  onClose,
}) {
  const [itemName, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [rate, setRate] = useState("");
  const [openingStock, setOpeningStock] = useState("");

  useEffect(() => {
    if (item) {
      setItemName(item.itemName);
      setUnit(item.unit);
      setRate(item.rate);
      setOpeningStock(item.openingStock);
    }
  }, [item]);

  const updateStock = async () => {
    if (
      !itemName.trim() ||
      !unit.trim() ||
      rate === "" ||
      openingStock === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await apiClient.put(`/stock/${item.id}`, {
        itemName,
        unit,
        rate,
        openingStock,
      });

      alert("Stock Updated Successfully");

      fetchStockItems(companyId);

      onClose();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Update Failed");
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          width: "420px",
        }}
      >
        <h2>Edit Stock Item</h2>

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

        <button onClick={updateStock}>
          Update
        </button>

        <button
          onClick={onClose}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditStockModal;