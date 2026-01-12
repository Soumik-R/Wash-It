const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  clothType: {
    type: String,
    required: true
  },
  washType: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Service", serviceSchema);
