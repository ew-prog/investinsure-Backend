const axios = require("axios");
const Payment = require("../models/Payment");
const Lead = require("../models/Lead");
const { paystack, flutterwave, mtn, airtel } = require("../config/payment");

// Paystack Initialize Payment
const paystackInit = async (req, res) => {
  const { agentId, leadIds } = req.body;
  const amount = leadIds.length * 500; // amount in NGN kobo

  try {
    const response = await axios.post(
      `${paystack.baseUrl}/transaction/initialize`,
      { email: "agent@example.com", amount },
      { headers: { Authorization: `Bearer ${paystack.secretKey}` } }
    );
    res.json({ authorization_url: response.data.data.authorization_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Paystack Verify Payment
const paystackVerify = async (req, res) => {
  const { reference, agentId, leadIds } = req.body;
  try {
    const response = await axios.get(`${paystack.baseUrl}/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${paystack.secretKey}` },
    });
    if (response.data.data.status === "success") {
      await Lead.updateMany({ _id: { $in: leadIds } }, { sold: true, agent: agentId });
      await Payment.create({ agent: agentId, leads: leadIds, transactionId: reference, amount: leadIds.length * 500, method: "Paystack", status: "success" });
      return res.json({ success: true, message: "Leads unlocked" });
    } else {
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Flutterwave Payment
const flutterwavePay = async (req, res) => {
  const { agentId, leadIds } = req.body;
  const amount = leadIds.length * 500; // NGN

  try {
    const response = await axios.post(
      `${flutterwave.baseUrl}/payments`,
      {
        tx_ref: "TX_" + Date.now(),
        amount,
        currency: "NGN",
        redirect_url: "http://localhost:3000/agent-dashboard",
        payment_options: "card,ussd,qr",
        customer: { email: "agent@example.com", name: "Agent Name" },
        meta: { agentId, leadIds }
      },
      { headers: { Authorization: `Bearer ${flutterwave.secretKey}` } }
    );
    res.json({ link: response.data.data.link });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MTN Mobile Money Payment
const mtnPay = async (req, res) => {
  const { agentId, leadIds, phone } = req.body;
  const amount = leadIds.length * 500;

  try {
    // MTN API request placeholder
    res.json({ message: `MTN payment request sent to ${phone}. Amount: ${amount}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Airtel Money Payment
const airtelPay = async (req, res) => {
  const { agentId, leadIds, phone } = req.body;
  const amount = leadIds.length * 500;

  try {
    // Airtel API request placeholder
    res.json({ message: `Airtel payment request sent to ${phone}. Amount: ${amount}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { paystackInit, paystackVerify, flutterwavePay, mtnPay, airtelPay };
