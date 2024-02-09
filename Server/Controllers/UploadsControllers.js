const User = require("../Models/UserModel");
const Upload = require("../Models/UploadModel");

// // Multer configuration for handling file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = path.join(__dirname, "../uploads");
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath);
//     }
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// Create an upload
// router.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     const { userId } = req.body; // Assuming you send the user ID along with the file
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const newUpload = new Upload({
//       user: userId,
//       fileName: req.file.filename,
//       filePath: req.file.path,
//       fileType: req.file.mimetype,
//       // Add other relevant fields
//     });

//     await newUpload.save();

//     // Add the new upload's reference to the user's uploads array
//     user.uploads.push(newUpload._id);
//     await user.save();

//     res.status(201).json(newUpload);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// const createUpload = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     console.log("userId:", userId);

//     const user = await User.findById(userId);
//     console.log(user);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const { filename, path, mimetype } = req.file;

//     const newUpload = await Upload.create({
//       user: userId,
//       fileName: filename,
//       filePath: path,
//       fileType: mimetype,
//       // Add other relevant fields
//     });

//     // Add the new upload's reference to the user's uploads array
//     user.uploads.push(newUpload._id);
//     await user.save();

//     res.status(201).json(newUpload);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// Get all uploads
const fetchUploads = async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.status(200).json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get uploads for a specific user
const fetchUserUploads = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("uploads");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Download an upload
const downloadUpload = async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.uploadId);
    if (!upload) {
      return res.status(404).json({ message: "Upload not found" });
    }

    res.download(upload.filePath, upload.fileName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an upload
const deleteUpload = async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.uploadId);
    if (!upload) {
      return res.status(404).json({ message: "Upload not found" });
    }

    await upload.remove();

    // Remove the upload's reference from the user's uploads array
    const user = await User.findById(upload.user);
    if (user) {
      user.uploads = user.uploads.filter(
        (uploadId) => uploadId.toString() !== req.params.uploadId
      );
      await user.save();
    }

    res.status(200).json({ message: "Upload deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  deleteUpload,
  downloadUpload,
  fetchUserUploads,
  fetchUploads,
};
