const { User, Upload } = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");

const fetchUploads = asyncHandler(async (req, res) => {
  try {
    const allPhotos = await Upload.find().sort({ createdAt: "descending" });
    res.send(allPhotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const fetchUploadById = asyncHandler(async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await Upload.findById(fileId);
    res.send(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const uploadFile = asyncHandler(async (req, res) => {
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

    res.send(upload);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const deleteUpload = asyncHandler(async (req, res) => {
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

const userUploads = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const uploads = user.uploads;
    res.json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = {
  uploadFile,
  deleteUpload,
  fetchUploads,
  userUploads,
  fetchUploadById,
};
