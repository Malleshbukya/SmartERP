import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function LedgerForm({ fetchLedgers }) {
  const [companies, setCompanies] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [openingBal, setOpeningBal] = useState("");
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

  const saveLedger = async () => {
    if (
      !name.trim() ||
      !type ||
      !openingBal ||
      !companyId
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await apiClient.post("/ledger/create", {
        name,
        type,
        openingBal,
        companyId,
      });

      alert("Ledger Created Successfully");

      setName("");
      setType("");
      setOpeningBal("");
      setCompanyId("");

      fetchLedgers(companyId);

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <h2>Add Ledger</h2>

      <input
        placeholder="Ledger Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

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

      <br /><br />

      <input
        type="number"
        placeholder="Opening Balance"
        value={openingBal}
        onChange={(e) => setOpeningBal(e.target.value)}
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

      <button onClick={saveLedger}>
        Save Ledger
      </button>
    </div>
  );
}

export default LedgerForm;