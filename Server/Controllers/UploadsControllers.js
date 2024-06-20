const { User, Upload, uploadTrasnlated } = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const sendEmail = require("../Middleware/emailService");

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

    if (!req.file) {
      return res.status(400).send({ message: "file is required" });
    }
    const file = req.file.originalname;
    const dataBuffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(dataBuffer);

    const text = data.text;
    const numWords = text.split(/\s+/).length;
    const numPages = data.numpages;

    const upload = await Upload.create({
      file: file,
      numPages: numPages,
      numWords: numWords,
    });

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

const downloadUpload = asyncHandler(async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join("uploads", filename);
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send({ message: "File not found" });
    }

    // Stream the file to the client
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
});

const downloadTranslatedUpload = asyncHandler(async (req, res) => {
  const filename = req.params.filename;
  console.log(filename);
  const filePath = path.join("translatedUploads", filename);
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send({ message: "File not found" });
    }

    // Stream the file to the client
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
});

const uploadTrasnlatedFile = asyncHandler(async (req, res) => {
  const userEmail = req.body.userEmail;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  try {
    if (!req.file) {
      return res.status(400).send({ message: "file is required" });
    }

    const file = req.file.originalname;

    const upload = await uploadTrasnlated.create({
      file: file,
    });

    sendEmail(
      user.email,
      "Your translated file is ready",
      "Your translated file is now ready for download. Please log in to your account to download it."
    );

    res.send(upload);
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
  downloadUpload,
  uploadTrasnlatedFile,
  downloadTranslatedUpload,
};
