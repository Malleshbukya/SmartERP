import { useState } from "react";
import apiClient from "../api/apiClient";

function CompanyForm({ fetchCompanies }) {
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [financialYear, setFinancialYear] = useState("");

  const saveCompany = async () => {
    // Validation
    if (
      !companyName.trim() ||
      !gstNumber.trim() ||
      !address.trim() ||
      !state.trim() ||
      !financialYear.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await apiClient.post("/company/create", {
        companyName,
        gstNumber,
        address,
        state,
        financialYear,
      });

      alert("Company Added Successfully");

      // Clear form
      setCompanyName("");
      setGstNumber("");
      setAddress("");
      setState("");
      setFinancialYear("");

      // Refresh company list
      fetchCompanies();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
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
      }}
    >
      <h2>Add Company</h2>

      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="GST Number"
        value={gstNumber}
        onChange={(e) => setGstNumber(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Financial Year"
        value={financialYear}
        onChange={(e) => setFinancialYear(e.target.value)}
      />

      <br />
      <br />

      <button onClick={saveCompany}>
        Save Company
      </button>
    </div>
  );
}

export default CompanyForm;