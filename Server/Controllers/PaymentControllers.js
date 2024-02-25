const { translationDemand } = require("../Models/UserModel");

// Controller function to initiate payment
const initiatePayment = async (req, res) => {
  try {
    const { translationDemandId } = req.params;

    const updatedTranslationDemand = await translationDemand.findByIdAndUpdate(
      translationDemandId,
      { paymentStatus: "Paid" },
      { new: true }
    );

    res.status(200).json(updatedTranslationDemand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function for admin validation
const adminValidateTranslationDemand = async (req, res) => {
  try {
    const { translationDemandId } = req.params;
    const { validationStatus, paymentStatus, status } = req.body;

    // Update the admin validation status and date
    const updatedTranslationDemand = await translationDemand.findByIdAndUpdate(
      translationDemandId,
      {
        adminValidationStatus: validationStatus,
        paymentStatus: paymentStatus,
        status: status,
        adminValidationDate: new Date(),
      },
      { new: true }
    );

    res.status(200).json(updatedTranslationDemand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { adminValidateTranslationDemand, initiatePayment };
