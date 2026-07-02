import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    navigate("/");
  };

  return (
    <div
      style={{
        height: "70px",
        backgroundColor: "#1e293b",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <h2>📊 SmartERP</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: "bold" }}>
            Welcome, {userName}
          </div>

          <small style={{ color: "#cbd5e1" }}>
            📅 {today}
          </small>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 18px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;