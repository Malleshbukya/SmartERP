import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT Token
    localStorage.removeItem("token");

    // Redirect to Login Page
    navigate("/");
  };

  return (
    <div
      style={{
        height: "60px",
        backgroundColor: "#1e293b",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <h2>SmartERP</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span>
  Welcome, {localStorage.getItem("userName")}
</span>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;