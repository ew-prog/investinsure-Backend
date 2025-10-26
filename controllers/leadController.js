const Lead = require("../models/Lead");
const { verifyLead } = require("../utils/leadVerification");

const createLead = async (req, res) => {
  try {
    const leadData = req.body;
    const { score, verificationStatus } = await verifyLead(leadData);
    const lead = await Lead.create({ ...leadData, score, verificationStatus });
    res.status(201).json({ success: true, lead });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const getVerifiedLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ verificationStatus: "verified" });
    res.status(200).json(leads);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { createLead, getVerifiedLeads };
