const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
  name: String,
  city: String,
  isAvailable: {
    type: Boolean,
    default: true
  },
  currentLocation: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("DeliveryAgent", deliveryAgentSchema);
/*ok */