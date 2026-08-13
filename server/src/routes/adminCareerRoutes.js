const express = require("express");
const router = express.Router();

const Career = require("../models/Career");
const adminAuth = require("../middleware/adminAuth");
const cloudinary = require("../config/cloudinary");

router.use(adminAuth);

// GET ALL CAREER APPLICATIONS
router.get("/", async (req, res) => {
  try {
    const careers = await Career.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: careers.length,
      data: careers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch career applications",
    });
  }
});


// GET SINGLE APPLICATION
router.get("/:id", async (req, res) => {
  try {
    const career = await Career.findById(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({
      success: true,
      data: career,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch application",
    });
  }
});


// UPDATE STATUS
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const career = await Career.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({
      success: true,
      message: "Application status updated successfully",
      data: career,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update application status",
    });
  }
});


// DELETE APPLICATION
router.delete("/:id", async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (career.resume?.publicId) {
      try {
        await cloudinary.uploader.destroy(career.resume.publicId, {
          resource_type: "raw",
        });
      } catch (storageError) {
        console.error("Resume deletion error:", storageError);
      }
    }

    res.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete application",
    });
  }
});


module.exports = router;