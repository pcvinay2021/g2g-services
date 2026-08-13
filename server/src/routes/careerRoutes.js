const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const Career = require("../models/Career");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Keep the resume in memory temporarily, then send it to Cloudinary.
// This avoids relying on Render's ephemeral local filesystem.
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC and DOCX resumes are allowed."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadResume = (file) =>
  new Promise((resolve, reject) => {
    const extension = path.extname(file.originalname).toLowerCase().replace(".", "");
    const publicId = `g2g-resumes/${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: publicId,
        format: extension,
        overwrite: false,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ ...result, publicId });
      }
    );

    stream.end(file.buffer);
  });

// POST /api/careers
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, position, message } = req.body;

    if (!name || !email || !phone || !position) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone and position are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume.",
      });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Resume storage is not configured on the server.",
      });
    }

    const uploaded = await uploadResume(req.file);

    const application = await Career.create({
      name,
      email,
      phone,
      position,
      resume: {
        originalName: req.file.originalname,
        fileName: uploaded.public_id,
        filePath: uploaded.secure_url,
        publicId: uploaded.public_id,
      },
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your career application has been submitted successfully.",
      data: application,
    });
  } catch (error) {
    console.error("Career Application Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to submit career application.",
    });
  }
});

module.exports = router;
