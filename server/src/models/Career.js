const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    position: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    resume: {
  originalName: {
    type: String,
    default: "",
  },

  fileName: {
    type: String,
    default: "",
  },

  filePath: {
    type: String,
    default: "",
  },

  publicId: {
    type: String,
    default: "",
  },
},

    status: {
      type: String,
      enum: [
        "New",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
      ],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Career",
  careerSchema
);