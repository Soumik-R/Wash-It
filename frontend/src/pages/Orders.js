import { useState, useEffect } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // This endpoint needs to be created in backend to get user's orders
      const response = await API.get("/orders/my-orders");
      setOrders(response.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      // For now, show empty state
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityLabel = (priority) => {
    return priority === 1 ? "Express" : "Normal";
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "#FFA500",
      Picked: "#2196F3",
      Processing: "#9C27B0",
      Completed: "#4CAF50",
      Cancelled: "#F44336"
    };
    return colors[status] || "#757575";
  };

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading orders...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>No orders yet. Start by placing an order!</p>
          <button
            onClick={() => window.location.href = "/services"}
            style={{ padding: "10px 20px", cursor: "pointer", marginTop: "10px" }}
          >
            Browse Services
          </button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                margin: "15px 0",
                backgroundColor: "#f9f9f9"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <strong>Order ID:</strong> {order._id}
                </div>
                <div
                  style={{
                    padding: "5px 15px",
                    borderRadius: "20px",
                    backgroundColor: getStatusColor(order.status),
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  {order.status}
                </div>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <strong>City:</strong> {order.city}
              </div>

              <div style={{ marginBottom: "10px" }}>
                <strong>Priority:</strong>{" "}
                <span
                  style={{
                    padding: "3px 10px",
                    backgroundColor: order.priority === 1 ? "#FF5722" : "#2196F3",
                    color: "white",
                    borderRadius: "5px"
                  }}
                >
                  {getPriorityLabel(order.priority)}
                </span>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <strong>Items:</strong>
                <ul>
                  {order.clothes?.map((item, index) => (
                    <li key={index}>
                      {item.clothType} - {item.washType} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <strong>Pickup:</strong> {new Date(order.pickupTime).toLocaleString()}
              </div>

              <div style={{ marginBottom: "10px" }}>
                <strong>Delivery:</strong> {new Date(order.deliveryTime).toLocaleString()}
              </div>

              <div style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px" }}>
                Total Price: ₹{order.price}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
