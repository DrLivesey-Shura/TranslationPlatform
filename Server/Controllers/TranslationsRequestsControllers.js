const { translationDemand, Upload, User } = require("../Models/UserModel");

// Create a new translation demand
const createTranslationDemand = async (req, res) => {
  try {
    const newTranslationDemand = await translationDemand.create(req.body);
    res.status(201).json(newTranslationDemand);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const createTranslationDemand = async (req, res) => {
//   try {
//     const { label, userId, language, estimatedDate } = req.body;
//     const file = req.file;
//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     // Check if file is provided
//     if (!file) {
//       return res.status(400).send({ message: "file is required" });
//     }

//     // Create the translation demand
//     const newTranslationDemand = await translationDemand.create({
//       label,
//       userId,
//       language,
//       estimatedDate,
//       file,
//     });

//     // Add the translation demand to user's demands
//     user.demands.push(newTranslationDemand);
//     await user.save();

//     res.status(201).json(newTranslationDemand);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all translation demands
const getAllTranslationDemands = async (req, res) => {
  try {
    // Use populate to get related Upload information
    const allTranslationDemands = await translationDemand
      .find()
      .populate("uploadId", "file numPages numWords")
      .populate("userId", "name pic email");

    res.status(200).json(allTranslationDemands);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific translation demand by ID
const getTranslationDemandById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundTranslationDemand = await translationDemand
      .findById(id)
      .populate("uploadId", "file numPages numWords estimatedDate")
      .populate("userId", "name pic email");
    if (!foundTranslationDemand) {
      return res.status(404).json({ error: "Translation Demand not found" });
    }
    res.status(200).json(foundTranslationDemand);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get translation demands for a specific user
const getUserTranslationDemand = async (req, res) => {
  const { id } = req.params;
  try {
    const foundUserTranslationDemand = await translationDemand
      .find({
        userId: id,
      })
      .populate("uploadId", "file");
    if (!foundUserTranslationDemand) {
      return res.status(404).json({ error: "Translation Demand not found" });
    }
    res.status(200).json(foundUserTranslationDemand);
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
  getUserTranslationDemand,
};
