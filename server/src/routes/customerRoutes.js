const express = require("express");
const bcrypt = require("bcryptjs");

const MobileUser = require("../models/MobileUser");
const { mobileAuth, allowRoles } = require("../middleware/mobileAuth");

const router = express.Router();

router.use(mobileAuth);
router.use(allowRoles("ADMIN", "MANAGER"));

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await MobileUser.find({
      role: "CUSTOMER",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.set("Cache-Control", "no-store");

    return res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error("Get Customers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers.",
    });
  }
});

// CREATE customer
router.post("/", async (req, res) => {
  try {
    const {
      name,
      mobile,
      loginId,
      password,
    } = req.body;

    if (!name || !mobile || !loginId || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, mobile, loginId and password are required.",
      });
    }

    if (String(password).length < 4) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 4 characters.",
      });
    }

    const cleanName = String(name).trim();
    const cleanMobile = String(mobile).trim();
    const cleanLoginId = String(loginId).trim().toUpperCase();

    const existingLogin = await MobileUser.findOne({
      loginId: cleanLoginId,
    });

    if (existingLogin) {
      return res.status(409).json({
        success: false,
        message: "Login ID already exists.",
      });
    }

    const existingMobile = await MobileUser.findOne({
      mobile: cleanMobile,
    });

    if (existingMobile) {
      return res.status(409).json({
        success: false,
        message: "Mobile number already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      String(password),
      12
    );

    const customer = await MobileUser.create({
      name: cleanName,
      mobile: cleanMobile,
      loginId: cleanLoginId,
      password: hashedPassword,
      role: "CUSTOMER",
      active: true,
      mustChangePassword: true,
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully.",
      data: {
        _id: customer._id,
        name: customer.name,
        mobile: customer.mobile,
        loginId: customer.loginId,
        role: customer.role,
        active: customer.active,
        mustChangePassword: customer.mustChangePassword,
      },
    });
  } catch (error) {
    console.error("Create Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create customer.",
    });
  }
});

// UPDATE customer
router.patch("/:id", async (req, res) => {
  try {
    const customer = await MobileUser.findOne({
      _id: req.params.id,
      role: "CUSTOMER",
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    const {
      name,
      mobile,
      loginId,
      password,
      active,
    } = req.body;

    if (mobile !== undefined) {
      const cleanMobile = String(mobile).trim();

      const duplicateMobile = await MobileUser.findOne({
        mobile: cleanMobile,
        _id: { $ne: customer._id },
      });

      if (duplicateMobile) {
        return res.status(409).json({
          success: false,
          message: "Mobile number already exists.",
        });
      }

      customer.mobile = cleanMobile;
    }

    if (loginId !== undefined) {
      const cleanLoginId = String(loginId)
        .trim()
        .toUpperCase();

      const duplicateLogin = await MobileUser.findOne({
        loginId: cleanLoginId,
        _id: { $ne: customer._id },
      });

      if (duplicateLogin) {
        return res.status(409).json({
          success: false,
          message: "Login ID already exists.",
        });
      }

      customer.loginId = cleanLoginId;
    }

    if (name !== undefined) {
      customer.name = String(name).trim();
    }

    if (active !== undefined) {
      customer.active = Boolean(active);
    }

    if (password !== undefined) {
      if (String(password).length < 4) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 4 characters.",
        });
      }

      customer.password = await bcrypt.hash(
        String(password),
        12
      );

      customer.mustChangePassword = true;
    }

    await customer.save();

    return res.json({
      success: true,
      message: "Customer updated successfully.",
      data: {
        _id: customer._id,
        name: customer.name,
        mobile: customer.mobile,
        loginId: customer.loginId,
        role: customer.role,
        active: customer.active,
        mustChangePassword: customer.mustChangePassword,
      },
    });
  } catch (error) {
    console.error("Update Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update customer.",
    });
  }
});

// DELETE customer
router.delete("/:id", async (req, res) => {
  try {
    const customer = await MobileUser.findOne({
      _id: req.params.id,
      role: "CUSTOMER",
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    await customer.deleteOne();

    return res.json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Customer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete customer.",
    });
  }
});

module.exports = router;