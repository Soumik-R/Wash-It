import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <nav style={{
      backgroundColor: "#333",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <a href="/city" style={{ color: "white", textDecoration: "none" }}>Home</a>
        <a href="/services" style={{ color: "white", textDecoration: "none" }}>Services</a>
        <a href="/orders" style={{ color: "white", textDecoration: "none" }}>My Orders</a>
        <a href="/admin" style={{ color: "white", textDecoration: "none" }}>Admin</a>
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: "5px 15px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
