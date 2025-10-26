const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  leads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lead" }],
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["Paystack", "Flutterwave", "MTN", "Airtel", "Bank"], required: true },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
