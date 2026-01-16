import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await API.get("/services");
      setServices(response.data);
    } catch (err) {
      console.error("Failed to fetch services");
    }
  };

  const addItem = (service) => {
    const item = {
      clothType: service.clothType,
      washType: service.washType,
      quantity: 1,
      price: service.basePrice
    };
    setSelectedItems([...selectedItems, item]);
  };

  const updateQuantity = (index, quantity) => {
    const updated = [...selectedItems];
    updated[index].quantity = parseInt(quantity);
    setSelectedItems(updated);
  };

  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const proceedToOrder = () => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    navigate("/order");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Available Services</h2>

      <div style={{ marginBottom: "30px" }}>
        <h3>Select Services:</h3>
        {services.map((service) => (
          <div
            key={service._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <strong>{service.clothType}</strong> - {service.washType}
              <br />
              Price: ₹{service.basePrice}
            </div>
            <button onClick={() => addItem(service)} style={{ padding: "5px 15px", cursor: "pointer" }}>
              Add
            </button>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div style={{ borderTop: "2px solid #333", paddingTop: "20px" }}>
          <h3>Your Cart:</h3>
          {selectedItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                {item.clothType} - {item.washType}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(index, e.target.value)}
                  style={{ width: "60px", padding: "5px" }}
                />
                <span>₹{item.price * item.quantity}</span>
                <button onClick={() => removeItem(index)} style={{ padding: "5px 10px", cursor: "pointer" }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <h3>Total: ₹{getTotalPrice()}</h3>
            <button
              onClick={proceedToOrder}
              style={{ padding: "10px 30px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none" }}
            >
              Proceed to Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
