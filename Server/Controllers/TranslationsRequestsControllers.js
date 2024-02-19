const { translationDemand } = require("../Models/UserModel");

// Create a new translation demand
const createTranslationDemand = async (req, res) => {
  try {
    const newTranslationDemand = await translationDemand.create(req.body);
    res.status(201).json(newTranslationDemand);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all translation demands
const getAllTranslationDemands = async (req, res) => {
  try {
    const allTranslationDemands = await translationDemand.find();
    res.status(200).json(allTranslationDemands);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific translation demand by ID
const getTranslationDemandById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundTranslationDemand = await translationDemand.findById(id);
    if (!foundTranslationDemand) {
      return res.status(404).json({ error: "Translation Demand not found" });
    }
    res.status(200).json(foundTranslationDemand);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a translation demand by ID
const updateTranslationDemandById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTranslationDemand = await translationDemand.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedTranslationDemand) {
      return res.status(404).json({ error: "Translation Demand not found" });
    }
    res.status(200).json(updatedTranslationDemand);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a translation demand by ID
const deleteTranslationDemandById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTranslationDemand = await translationDemand.findByIdAndDelete(
      id
    );
    if (!deletedTranslationDemand) {
      return res.status(404).json({ error: "Translation Demand not found" });
    }
    res.status(200).json(deletedTranslationDemand);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTranslationDemand,
  getAllTranslationDemands,
  getTranslationDemandById,
  updateTranslationDemandById,
  deleteTranslationDemandById,
};
