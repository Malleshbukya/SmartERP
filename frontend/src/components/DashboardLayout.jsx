import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#0f172a",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          {children}
        </div>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#1e293b",
            color: "#cbd5e1",
            textAlign: "center",
            padding: "12px",
            borderTop: "1px solid #334155",
            fontSize: "14px",
          }}
        >
          © 2026 SmartERP | Billing & Inventory Management System <br />
          Developed by <strong>Mallesh Bukya</strong>
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;