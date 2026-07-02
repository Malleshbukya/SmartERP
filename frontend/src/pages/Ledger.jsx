import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import LedgerForm from "../components/LedgerForm";
import EditLedgerModal from "../components/EditLedgerModal";
import apiClient from "../api/apiClient";

function Ledger() {
  const [ledgers, setLedgers] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [selectedLedger, setSelectedLedger] = useState(null);

  useEffect(() => {
    loadDefaultCompany();
  }, []);

  const loadDefaultCompany = async () => {
    try {
      const response = await apiClient.get("/company");

      if (response.data.length > 0) {
        const id = response.data[0].id;
        setCompanyId(id);
        fetchLedgers(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLedgers = async (id) => {
    try {
      const response = await apiClient.get(
        `/ledger?companyId=${id}`
      );

      setLedgers(response.data);
      setCompanyId(id);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLedger = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this ledger?"
    );

    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/ledger/${id}`);

      alert("Ledger Deleted Successfully");

      fetchLedgers(companyId);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h1>Ledger Management</h1>

      <LedgerForm fetchLedgers={fetchLedgers} />

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
            <th>Ledger Name</th>
            <th>Type</th>
            <th>Opening Balance</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {ledgers.length > 0 ? (

            ledgers.map((ledger) => (

              <tr key={ledger.id}>

                <td>{ledger.id}</td>
                <td>{ledger.name}</td>
                <td>{ledger.type}</td>
                <td>{ledger.openingBal}</td>

                <td>

                  <button
                    onClick={() =>
                      setSelectedLedger(ledger)
                    }
                    style={{
                      background:"#2563eb",
                      color:"white",
                      border:"none",
                      padding:"8px 12px",
                      borderRadius:"5px",
                      marginRight:"10px",
                      cursor:"pointer"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteLedger(ledger.id)
                    }
                    style={{
                      background:"#dc2626",
                      color:"white",
                      border:"none",
                      padding:"8px 12px",
                      borderRadius:"5px",
                      cursor:"pointer"
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
                colSpan="5"
                style={{
                  textAlign:"center",
                  padding:"20px"
                }}
              >
                No Ledgers Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

      {selectedLedger && (

        <EditLedgerModal
  ledger={selectedLedger}
  companyId={companyId}
  fetchLedgers={fetchLedgers}
  onClose={() => setSelectedLedger(null)}
/>

      )}

    </DashboardLayout>
  );
}

export default Ledger;