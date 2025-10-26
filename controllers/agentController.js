const Lead = require("../models/Lead");
const Payment = require("../models/Payment");

const getAvailableLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ verificationStatus: "verified", sold: false });
    res.status(200).json(leads);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const purchaseLeads = async (req, res) => {
  try {
    const { leadIds, agentId, transactionId, method } = req.body;
    await Lead.updateMany({ _id: { $in: leadIds } }, { sold: true, agent: agentId });
    await Payment.create({ agent: agentId, leads: leadIds, transactionId, amount: leadIds.length * 5, method, status: "success" });
    res.status(200).json({ success: true, message: "Leads purchased successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { getAvailableLeads, purchaseLeads };
