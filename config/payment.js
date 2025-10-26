// Placeholder for payment config
module.exports = {
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY,
    baseUrl: "https://api.paystack.co"
  },
  flutterwave: {
    secretKey: process.env.FLUTTERWAVE_SECRET_KEY,
    baseUrl: "https://api.flutterwave.com/v3"
  },
  mtn: {
    apiKey: process.env.MTN_API_KEY,
    baseUrl: "https://sandbox.momodeveloper.mtn.com"
  },
  airtel: {
    apiKey: process.env.AIRTM_API_KEY,
    baseUrl: "https://sandbox.airtel.com"
  }
};
