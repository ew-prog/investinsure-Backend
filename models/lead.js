const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  product: { type: String, required: true },
  insuranceCompany: { type: String },
  score: { type: Number, default: 0 },
  verificationStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  sold: { type: Boolean, default: false },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", leadSchema);
