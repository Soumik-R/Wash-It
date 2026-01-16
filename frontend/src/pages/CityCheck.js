import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CityCheck() {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  const checkCity = async () => {
    try {
      const response = await API.get(`/cities/check/${city}`);
      if (response.data.available) {
        setMessage(`Great! We serve ${city}. Redirecting to services...`);
        setIsAvailable(true);
        setTimeout(() => navigate("/services"), 2000);
      } else {
        setMessage(`Sorry, we don't serve ${city} yet.`);
        setIsAvailable(false);
      }
    } catch (err) {
      setMessage("Error checking city availability");
      setIsAvailable(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Check City Availability</h2>
      <p>Enter your city to check if we provide service there:</p>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <button
        onClick={checkCity}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Check Availability
      </button>
      {message && (
        <p style={{ color: isAvailable ? "green" : "red", marginTop: "20px" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default CityCheck;
