const express = require("express");
const { getAvailableLeads, purchaseLeads } = require("../controllers/agentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/leads", protect, getAvailableLeads);
router.post("/purchase", protect, purchaseLeads);

module.exports = router;
