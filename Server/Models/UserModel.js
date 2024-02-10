const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const uploadSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    adress: { type: String, required: true },
    birthDay: { type: Date, required: true },
    phone: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    uploads: [uploadSchema],
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("findOneAndRemove", async function (next) {
  const user = this; // 'this' refers to the document being removed

  // Access the user's uploads and remove the associated upload from the Upload schema
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
const Upload = mongoose.model("Upload", uploadSchema);

module.exports = { User, Upload };
