import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import apiClient from "../api/apiClient";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    companyCount: 0,
    ledgerCount: 0,
    stockCount: 0,
    purchaseCount: 0,
    salesCount: 0,
    inventoryValue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await apiClient.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = (bg) => ({
    background: bg,
    color: "#fff",
    borderRadius: "18px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
    transition: "0.3s",
    cursor: "pointer",
  });

  return (
    <DashboardLayout>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "52px",
          color: "#ffffff",
        }}
      >
        📊 SmartERP Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        <div
          style={cardStyle("linear-gradient(135deg,#2563eb,#1d4ed8)")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-8px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3>🏢 Companies</h3>
          <h1 style={{ fontSize: "48px" }}>
            {dashboard.companyCount}
          </h1>
        </div>

        <div
          style={cardStyle("linear-gradient(135deg,#9333ea,#7e22ce)")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-8px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3>📒 Ledgers</h3>
          <h1 style={{ fontSize: "48px" }}>
            {dashboard.ledgerCount}
          </h1>
        </div>

        <div
          style={cardStyle("linear-gradient(135deg,#10b981,#059669)")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-8px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3>📦 Stock Items</h3>
          <h1 style={{ fontSize: "48px" }}>
            {dashboard.stockCount}
          </h1>
        </div>

        <div
          style={cardStyle("linear-gradient(135deg,#f97316,#ea580c)")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-8px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3>🛒 Purchases</h3>
          <h1 style={{ fontSize: "48px" }}>
            {dashboard.purchaseCount}
          </h1>
        </div>

        <div
          style={cardStyle("linear-gradient(135deg,#ef4444,#dc2626)")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-8px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3>💰 Sales</h3>
          <h1 style={{ fontSize: "48px" }}>
            {dashboard.salesCount}
          </h1>
        </div>

        <div
          style={cardStyle("linear-gradient(135deg,#06b6d4,#0891b2)")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-8px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <h3>💎 Inventory Value</h3>
          <h1 style={{ fontSize: "38px" }}>
            ₹ {dashboard.inventoryValue}
          </h1>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;