import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function EditCompanyModal({
  company,
  onClose,
  fetchCompanies,
}) {
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [financialYear, setFinancialYear] = useState("");

  useEffect(() => {
    if (company) {
      setCompanyName(company.companyName);
      setGstNumber(company.gstNumber);
      setAddress(company.address);
      setState(company.state);
      setFinancialYear(company.financialYear);
    }
  }, [company]);

  const updateCompany = async () => {
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
      await apiClient.put(`/company/${company.id}`, {
        companyName,
        gstNumber,
        address,
        state,
        financialYear,
      });

      alert("Company Updated Successfully");

      fetchCompanies();
      onClose();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
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
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <h2>Edit Company</h2>

        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />

        <br /><br />

        <input
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
          placeholder="GST Number"
        />

        <br /><br />

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        <br /><br />

        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
        />

        <br /><br />

        <input
          value={financialYear}
          onChange={(e) => setFinancialYear(e.target.value)}
          placeholder="Financial Year"
        />

        <br /><br />

        <button onClick={updateCompany}>
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

export default EditCompanyModal;