const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Contact = require("../models/Contact");
const Career = require("../models/Career");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();


// =====================================================
// ADMIN LOGIN
// POST /api/admin/login
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      message: "Admin login successful.",

      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {

    console.error("Admin Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to login.",
    });
  }
});


// =====================================================
// ADMIN PROFILE
// GET /api/admin/me
// =====================================================

router.get("/me", adminAuth, async (req, res) => {
  try {

    const admin = await Admin.findById(req.admin.id)
      .select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    res.json({
      success: true,
      data: admin,
    });

  } catch (error) {

    console.error("Admin Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch admin profile.",
    });
  }
});


// =====================================================
// DASHBOARD SUMMARY
// GET /api/admin/dashboard
// =====================================================

router.get("/dashboard", adminAuth, async (req, res) => {
  try {

    const [
      totalContacts,
      totalCareers,
      newCareers,
      shortlistedCareers,
      selectedCareers,
      rejectedCareers,
    ] = await Promise.all([

      Contact.countDocuments(),

      Career.countDocuments(),

      Career.countDocuments({
        status: "New",
      }),

      Career.countDocuments({
        status: "Shortlisted",
      }),

      Career.countDocuments({
        status: "Selected",
      }),

      Career.countDocuments({
        status: "Rejected",
      }),

    ]);


    res.json({
      success: true,

      data: {
        totalContacts,
        totalCareers,

        careerStatus: {
          new: newCareers,
          shortlisted: shortlistedCareers,
          selected: selectedCareers,
          rejected: rejectedCareers,
        },
      },
    });

  } catch (error) {

    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard.",
    });
  }
});


// =====================================================
// CONTACT ENQUIRIES
// GET /api/admin/contacts
// =====================================================

router.get("/contacts", adminAuth, async (req, res) => {
  try {

    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });

  } catch (error) {

    console.error("Contacts Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch contact enquiries.",
    });
  }
});


// UPDATE CONTACT STATUS
// PATCH /api/admin/contacts/:id/status

router.patch("/contacts/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["New", "In Progress", "Resolved"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    res.json({
      success: true,
      message: "Enquiry status updated successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Contact Status Update Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update enquiry status.",
    });
  }
});


// DELETE CONTACT ENQUIRY
// DELETE /api/admin/contacts/:id

router.delete("/contacts/:id", adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    res.json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete enquiry.",
    });
  }
});


module.exports = router;