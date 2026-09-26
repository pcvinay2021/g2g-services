const express = require("express");
const bcrypt = require("bcryptjs");
const MobileUser = require("../models/MobileUser");
const { mobileAuth, allowRoles } = require("../middleware/mobileAuth");

const router = express.Router();

router.use(mobileAuth, allowRoles("ADMIN", "MANAGER"));

const safe = (u) => ({
  id: u._id,
  name: u.name,
  mobile: u.mobile || "",
  loginId: u.loginId || "",
  role: u.role,
  active: u.active,
  mustChangePassword: !!u.mustChangePassword
});

// GET STAFF
router.get("/", async (req, res) => {
  try {
    const q =
      req.user.role === "MANAGER"
        ? { role: "TECHNICIAN", active: true }
        : {};

    const users = await MobileUser.find(q)
      .select("-password")
      .sort({ name: 1 });

    res.json({
      success: true,
      data: users
    });
  } catch (e) {
    console.error("GET STAFF:", e);

    res.status(500).json({
      success: false,
      message: "Unable to load staff."
    });
  }
});

// CREATE STAFF
router.post("/", allowRoles("ADMIN"), async (req, res) => {
  try {
    const {
      name,
      mobile,
      role,
      loginId,
      password
    } = req.body;

    const cleanName = String(name || "").trim();
    const cleanMobile = String(mobile || "").trim();
    const cleanRole = String(role || "").toUpperCase();
    const cleanLoginId = String(loginId || "").trim().toUpperCase();

    if (
      !cleanName ||
      !cleanRole ||
      !cleanLoginId ||
      !password ||
      !["TECHNICIAN", "MANAGER"].includes(cleanRole)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff details."
      });
    }

    if (String(password).length < 4) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 4 characters."
      });
    }

    const loginExists = await MobileUser.findOne({
      loginId: cleanLoginId
    });

    if (loginExists) {
      return res.status(409).json({
        success: false,
        message: "Login ID already exists."
      });
    }

    if (cleanMobile) {
      const mobileExists = await MobileUser.findOne({
        mobile: cleanMobile
      });

      if (mobileExists) {
        return res.status(409).json({
          success: false,
          message: "Mobile number already exists."
        });
      }
    }

    const u = await MobileUser.create({
      name: cleanName,
      mobile: cleanMobile || undefined,
      role: cleanRole,
      loginId: cleanLoginId,
      password: await bcrypt.hash(password, 12),
      mustChangePassword: true,
      active: true
    });

    res.status(201).json({
      success: true,
      data: safe(u)
    });

  } catch (e) {
    console.error("CREATE STAFF:", e);

    if (e.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Login ID or mobile number already exists."
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to create staff."
    });
  }
});

// UPDATE STAFF
router.patch("/:id", allowRoles("ADMIN"), async (req, res) => {
  try {
    const u = await MobileUser.findById(req.params.id);

    if (!u) {
      return res.status(404).json({
        success: false,
        message: "Staff not found."
      });
    }

    const {
      name,
      mobile,
      loginId,
      password,
      active
    } = req.body;

    if (name !== undefined) {
      u.name = String(name).trim();
    }

    if (mobile !== undefined) {
      const cleanMobile = String(mobile).trim();

      if (cleanMobile && cleanMobile !== u.mobile) {
        const mobileExists = await MobileUser.findOne({
          mobile: cleanMobile,
          _id: { $ne: u._id }
        });

        if (mobileExists) {
          return res.status(409).json({
            success: false,
            message: "Mobile number already exists."
          });
        }
      }

      u.mobile = cleanMobile;
    }

    if (loginId !== undefined) {
      const cleanLoginId = String(loginId).trim().toUpperCase();

      if (!cleanLoginId) {
        return res.status(400).json({
          success: false,
          message: "Login ID cannot be empty."
        });
      }

      if (cleanLoginId !== u.loginId) {
        const loginExists = await MobileUser.findOne({
          loginId: cleanLoginId,
          _id: { $ne: u._id }
        });

        if (loginExists) {
          return res.status(409).json({
            success: false,
            message: "Login ID already exists."
          });
        }
      }

      u.loginId = cleanLoginId;
    }

    if (password !== undefined && password !== "") {
      if (String(password).length < 4) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 4 characters."
        });
      }

      u.password = await bcrypt.hash(password, 12);
      u.mustChangePassword = true;
    }

    if (active !== undefined) {
      u.active = !!active;
    }

    await u.save();

    res.json({
      success: true,
      data: safe(u)
    });

  } catch (e) {
    console.error("UPDATE STAFF:", e);

    if (e.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Login ID or mobile number already exists."
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to update staff."
    });
  }
});

// DELETE STAFF
router.delete("/:id", allowRoles("ADMIN"), async (req, res) => {
  try {
    const u = await MobileUser.findByIdAndDelete(req.params.id);

    if (!u) {
      return res.status(404).json({
        success: false,
        message: "Staff not found."
      });
    }

    res.json({
      success: true,
      message: "Staff deleted."
    });

  } catch (e) {
    console.error("DELETE STAFF:", e);

    res.status(500).json({
      success: false,
      message: "Unable to delete staff."
    });
  }
});

module.exports = router;