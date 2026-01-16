const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const cityRoutes = require("./routes/cityRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const orderRoutes = require("./routes/orderRoutes");
const schedulerRoutes = require("./routes/schedulerRoutes");
const routeRoutes = require("./routes/routeRoutes");
const batchingRoutes = require("./routes/batchingRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/scheduler", schedulerRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/batching", batchingRoutes);

app.get("/", (req, res) => {
  res.send("Wash-It Backend Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
