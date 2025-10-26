const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { paystackInit, paystackVerify, flutterwavePay, mtnPay, airtelPay } = require("../controllers/paymentController");
const router = express.Router();

router.post("/paystack/init", protect, paystackInit);
router.post("/paystack/verify", protect, paystackVerify);
router.post("/flutterwave", protect, flutterwavePay);
router.post("/mtn", protect, mtnPay);
router.post("/airtel", protect, airtelPay);

module.exports = router;
