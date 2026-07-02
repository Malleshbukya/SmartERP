import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Company", path: "/company", icon: "🏢" },
    { name: "Ledger", path: "/ledger", icon: "📒" },
    { name: "Stock", path: "/stock", icon: "📦" },
    { name: "Purchase", path: "/purchase", icon: "🛒" },
    { name: "Sales", path: "/sales", icon: "💰" },
    { name: "Reports", path: "/reports", icon: "📊" },
  ];

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "35px",
          color: "#38bdf8",
        }}
      >
        SmartERP
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
              color: "white",
              padding: "14px",
              borderRadius: "8px",
              backgroundColor:
                location.pathname === item.path
                  ? "#2563eb"
                  : "#1e293b",
              fontSize: "16px",
              fontWeight:
                location.pathname === item.path
                  ? "bold"
                  : "normal",
              transition: "0.3s",
            }}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;