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
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!req.body.photo) {
      return res.status(400).send({ message: "Photo is required" });
    }
    const photo = req.body.photo;

    const upload = await Upload.create({ photo });

    user.uploads.push(upload);
    await user.save();

    console.log("Uploaded Successfully...");

    res.send(upload);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/delete/:uploadId", async (req, res) => {
  try {
    const { uploadId } = req.params;

    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const uploadToDelete = user.uploads.find(
      (upload) => upload._id.toString() === uploadId
    );

    if (!uploadToDelete) {
      return res.status(404).send({ message: "Upload not found for the user" });
    }

    user.uploads.pull(uploadToDelete);

    await user.save();

    await Upload.findOneAndDelete({ _id: uploadId });

    res.status(200).json({ message: "Upload deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
