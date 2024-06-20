const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const uploadSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
    numPages: {
      type: Number,
      required: true,
    },
    numWords: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const uploadTrasnlatedSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const translationDemandSchema = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    uploadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    estimatedDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Working", "Done"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Verifying", "Verified", "Refused"],
      default: "Unpaid",
    },
    adminValidationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    paymentProof: {
      type: String,
    },
    adminValidationDate: {
      type: Date,
    },
    isUrgent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// const translationDemandSchema = new mongoose.Schema(
//   {
//     label: {
//       type: String,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     language: {
//       type: String,
//       required: true,
//     },
//     estimatedDate: {
//       type: Date,
//       required: true,
//     },
//     // file: {
//     //   type: String,
//     //   required: true,
//     // },
//     status: {
//       type: String,
//       enum: ["Pending", "Working", "Done"],
//       default: "Pending",
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["Unpaid", "Verifying", "Verified", "Refused"],
//       default: "Unpaid",
//     },
//     adminValidationStatus: {
//       type: String,
//       enum: ["Pending", "Approved", "Rejected"],
//       default: "Pending",
//     },
//     paymentProof: {
//       type: String,
//     },
//     adminValidationDate: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    level: { type: String, required: true },
    birthDay: { type: Date, required: true },
    phone: { type: String, required: true },
    uploads: [uploadSchema],
    translationDemands: [translationDemandSchema],
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const employeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    languages: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("findOneAndRemove", async function (next) {
  const user = this;

  await Promise.all(
    user.uploads.map(async (upload) => {
      await mongoose.model("Upload").findByIdAndRemove(upload._id);
    })
  );

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);
const Employe = mongoose.model("Employe", employeSchema);
const Upload = mongoose.model("Upload", uploadSchema);
const uploadTrasnlated = mongoose.model(
  "UploadTrasnlated",
  uploadTrasnlatedSchema
);
const translationDemand = mongoose.model(
  "translationDemand",
  translationDemandSchema
);

module.exports = {
  User,
  Employe,
  Upload,
  translationDemand,
  uploadTrasnlated,
};
