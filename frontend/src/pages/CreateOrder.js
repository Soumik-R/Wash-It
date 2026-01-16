import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateOrder() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [city, setCity] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [isExpress, setIsExpress] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("selectedItems") || "[]");
    if (items.length === 0) {
      navigate("/services");
      return;
    }
    setSelectedItems(items);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        clothes: selectedItems,
        city,
        pickupTime,
        deliveryTime,
        isExpress
      };

      await API.post("/orders/create", orderData);
      localStorage.removeItem("selectedItems");
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    }
  };

  const getTotalPrice = () => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Create Order</h2>

      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f5f5f5" }}>
        <h3>Order Summary:</h3>
        {selectedItems.map((item, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            {item.clothType} - {item.washType} x {item.quantity} = ₹{item.price * item.quantity}
          </div>
        ))}
        <hr />
        <strong>Total: ₹{getTotalPrice()}</strong>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%" }}
        />

        <label style={{ display: "block", margin: "10px 0" }}>
          Pickup Time:
          <input
            type="datetime-local"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            required
            style={{ display: "block", margin: "5px 0", padding: "10px", width: "100%" }}
          />
        </label>

        <label style={{ display: "block", margin: "10px 0" }}>
          Delivery Time:
          <input
            type="datetime-local"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            required
            style={{ display: "block", margin: "5px 0", padding: "10px", width: "100%" }}
          />
        </label>

        <label style={{ display: "block", margin: "20px 0" }}>
          <input
            type="checkbox"
            checked={isExpress}
            onChange={(e) => setIsExpress(e.target.checked)}
            style={{ marginRight: "10px" }}
          />
          Express Delivery (Higher Priority)
        </label>

        <button
          type="submit"
          style={{ padding: "10px 30px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none" }}
        >
          Confirm Order
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default CreateOrder;
