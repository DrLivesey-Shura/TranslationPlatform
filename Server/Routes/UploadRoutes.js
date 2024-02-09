const { Router } = require("express");
const { User, Upload } = require("../Models/UserModel");
const uploadMiddleware = require("../Middleware/MulterMiddleware");

const router = Router();

router.get("/", async (req, res) => {
  const allPhotos = await Upload.find().sort({ createdAt: "descending" });
  res.send(allPhotos);
});

router.post("/", uploadMiddleware.single("photo"), async (req, res) => {
  try {
    // Assuming you have user authentication and can access user ID
    const userId = req.body.userId; // Update this based on your authentication setup

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const photo = req.file.filename;

    const upload = await Upload.create({ photo });

    // Associate the upload with the user
    user.uploads.push(upload);
    await user.save();

    console.log("Uploaded Successfully...");

    res.send(upload);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
