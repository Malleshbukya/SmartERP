import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import CompanyForm from "../components/CompanyForm";
import EditCompanyModal from "../components/EditCompanyModal";
import apiClient from "../api/apiClient";

function Company() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await apiClient.get("/company");
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load companies");
    }
  };

  const deleteCompany = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/company/${id}`);

      alert("Company Deleted Successfully");

      fetchCompanies();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Delete Failed");
      }
    }
  };

  return (
    <DashboardLayout>
      <h1>Company Management</h1>

      <CompanyForm fetchCompanies={fetchCompanies} />

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
            <th>Company Name</th>
            <th>GST Number</th>
            <th>Address</th>
            <th>State</th>
            <th>Financial Year</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.companyName}</td>
                <td>{company.gstNumber}</td>
                <td>{company.address}</td>
                <td>{company.state}</td>
                <td>{company.financialYear}</td>

                <td>
                  <button
                    onClick={() => setSelectedCompany(company)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      marginRight: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCompany(company.id)}
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
                No Companies Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedCompany && (
        <EditCompanyModal
          company={selectedCompany}
          fetchCompanies={fetchCompanies}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </DashboardLayout>
  );
}

export default Company;