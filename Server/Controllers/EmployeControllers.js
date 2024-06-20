const asyncHandler = require("express-async-handler");
const { Employe } = require("../Models/UserModel");

const newEmpolye = asyncHandler(async (req, res) => {
  const { name, email, phone, languages } = req.body;

  if (!(name || email || phone || languages)) {
    res.status(400);
    throw new Error("Please Enter All The Fields!");
  }
  const employeExistsByEmail = await Employe.findOne({ email });

  if (employeExistsByEmail) {
    res.status(408);
    throw new Error(`employe with email '${email}' already exists`);
  }

  const employe = await Employe.create({
    name,
    email,
    phone,
    languages,
  });

  if (employe) {
    res.status(201).json({
      _id: employe._id,
      name: employe.name,
      email: employe.email,
      phone: employe.phone,
      languages: employe.languages,
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create a employe");
  }
});

const getAllEmployes = asyncHandler(async (req, res) => {
  const employes = await Employe.find();
  res.json({ employes });
});

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee by ID and delete
    const employee = await Employe.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

module.exports = {
  newEmpolye,
  getAllEmployes,
  deleteEmployee,
};
