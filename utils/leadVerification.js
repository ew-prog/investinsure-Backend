// AI verification & scoring placeholder
const verifyLead = async (lead) => {
  const isPhoneValid = lead.phone.length >= 10;
  const isEmailValid = lead.email.includes("@");
  let score = 0;
  if (isPhoneValid) score += 50;
  if (isEmailValid) score += 50;
  const verificationStatus = score >= 80 ? "verified" : "pending";
  return { score, verificationStatus };
};

module.exports = { verifyLead };
