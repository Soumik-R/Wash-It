import { useState } from "react";
import API from "../services/api";

function Admin() {
  const [activeTab, setActiveTab] = useState("city");

  // City Management
  const [cityName, setCityName] = useState("");
  const [cityMessage, setCityMessage] = useState("");

  // Service Management
  const [clothType, setClothType] = useState("");
  const [washType, setWashType] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [serviceMessage, setServiceMessage] = useState("");

  // Scheduler
  const [schedulerResult, setSchedulerResult] = useState(null);

  // Batching
  const [agentId, setAgentId] = useState("");
  const [batchingResult, setBatchingResult] = useState(null);

  const addCity = async (e) => {
    e.preventDefault();
    try {
      await API.post("/cities/add", { name: cityName, isActive: true });
      setCityMessage(`City "${cityName}" added successfully!`);
      setCityName("");
    } catch (err) {
      setCityMessage(err.response?.data?.message || "Failed to add city");
    }
  };

  const addService = async (e) => {
    e.preventDefault();
    try {
      await API.post("/services/add", {
        clothType,
        washType,
        basePrice: parseFloat(basePrice)
      });
      setServiceMessage("Service added successfully!");
      setClothType("");
      setWashType("");
      setBasePrice("");
    } catch (err) {
      setServiceMessage(err.response?.data?.message || "Failed to add service");
    }
  };

  const triggerScheduler = async () => {
    try {
      const response = await API.get("/scheduler/next");
      setSchedulerResult(response.data);
    } catch (err) {
      setSchedulerResult({ error: err.response?.data?.message || "Failed to process next order" });
    }
  };

  const assignOrders = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/batching/assign", { agentId });
      setBatchingResult(response.data);
    } catch (err) {
      setBatchingResult({ error: err.response?.data?.message || "Failed to assign orders" });
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("city")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "city" ? "#4CAF50" : "#ddd",
            color: activeTab === "city" ? "white" : "black",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add City
        </button>
        <button
          onClick={() => setActiveTab("service")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "service" ? "#4CAF50" : "#ddd",
            color: activeTab === "service" ? "white" : "black",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add Service
        </button>
        <button
          onClick={() => setActiveTab("scheduler")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "scheduler" ? "#4CAF50" : "#ddd",
            color: activeTab === "scheduler" ? "white" : "black",
            border: "none",
            cursor: "pointer"
          }}
        >
          Scheduler
        </button>
        <button
          onClick={() => setActiveTab("batching")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "batching" ? "#4CAF50" : "#ddd",
            color: activeTab === "batching" ? "white" : "black",
            border: "none",
            cursor: "pointer"
          }}
        >
          Batching
        </button>
      </div>

      {activeTab === "city" && (
        <div>
          <h3>Add New City</h3>
          <form onSubmit={addCity}>
            <input
              type="text"
              placeholder="City Name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              required
              style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%" }}
            />
            <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
              Add City
            </button>
          </form>
          {cityMessage && <p style={{ color: "green", marginTop: "10px" }}>{cityMessage}</p>}
        </div>
      )}

      {activeTab === "service" && (
        <div>
          <h3>Add New Service</h3>
          <form onSubmit={addService}>
            <input
              type="text"
              placeholder="Cloth Type (e.g., Shirt, Jeans)"
              value={clothType}
              onChange={(e) => setClothType(e.target.value)}
              required
              style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%" }}
            />
            <input
              type="text"
              placeholder="Wash Type (e.g., Dry Clean, Regular)"
              value={washType}
              onChange={(e) => setWashType(e.target.value)}
              required
              style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%" }}
            />
            <input
              type="number"
              placeholder="Base Price"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
              style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%" }}
            />
            <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
              Add Service
            </button>
          </form>
          {serviceMessage && <p style={{ color: "green", marginTop: "10px" }}>{serviceMessage}</p>}
        </div>
      )}

      {activeTab === "scheduler" && (
        <div>
          <h3>Process Next Order (Scheduler)</h3>
          <button
            onClick={triggerScheduler}
            style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#2196F3", color: "white", border: "none" }}
          >
            Get Next Order
          </button>
          {schedulerResult && (
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
              <h4>Result:</h4>
              <pre>{JSON.stringify(schedulerResult, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {activeTab === "batching" && (
        <div>
          <h3>Assign Orders to Delivery Agent</h3>
          <form onSubmit={assignOrders}>
            <input
              type="text"
              placeholder="Delivery Agent ID"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              required
              style={{ display: "block", margin: "10px 0", padding: "10px", width: "100%" }}
            />
            <button
              type="submit"
              style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#FF9800", color: "white", border: "none" }}
            >
              Assign Orders
            </button>
          </form>
          {batchingResult && (
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
              <h4>Result:</h4>
              <pre>{JSON.stringify(batchingResult, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
