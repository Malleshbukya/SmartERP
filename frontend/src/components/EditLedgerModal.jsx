import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function EditLedgerModal({
  ledger,
  companyId,
  onClose,
  fetchLedgers,
})


{
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [openingBal, setOpeningBal] = useState("");

  useEffect(() => {
    if (ledger) {
      setName(ledger.name);
      setType(ledger.type);
      setOpeningBal(ledger.openingBal);
    }
  }, [ledger]);

  const updateLedger = async () => {
    if (
      !name.trim() ||
      !type.trim() ||
      openingBal === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await apiClient.put(`/ledger/${ledger.id}`, {
        name,
        type,
        openingBal,
      });

      alert("Ledger Updated Successfully");

      fetchLedgers(companyId);

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
          width: "400px",
        }}
      >
        <h2>Edit Ledger</h2>

        <input
          placeholder="Ledger Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option>Customer</option>
          <option>Supplier</option>
          <option>Bank</option>
          <option>Cash</option>
          <option>Expense</option>
          <option>Income</option>
          <option>Capital</option>
          <option>Loan</option>
        </select>

        <br />
        <br />

        <input
          type="number"
          placeholder="Opening Balance"
          value={openingBal}
          onChange={(e) => setOpeningBal(e.target.value)}
        />

        <br />
        <br />

        <button onClick={updateLedger}>
          Update
        </button>

        <button
          onClick={onClose}
          style={{
            marginLeft: "10px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditLedgerModal;