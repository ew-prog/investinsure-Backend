const express = require("express");
const { createLead, getVerifiedLeads } = require("../controllers/leadController");
const router = express.Router();

router.post("/", createLead);
router.get("/", getVerifiedLeads);

module.exports = router;
