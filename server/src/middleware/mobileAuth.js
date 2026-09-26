const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const MobileUser = require("../models/MobileUser");

async function mobileAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required."
      });
    }

    const token = header.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id || !decoded.role) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token."
      });
    }

    const role = String(decoded.role).toUpperCase();

    // ADMIN is stored in separate Admin collection
    if (role === "ADMIN") {
      const admin = await Admin.findById(decoded.id).select("_id name email");

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Admin account not found."
        });
      }

      req.user = {
        id: String(admin._id),
        role: "ADMIN",
        name: admin.name,
        loginId: admin.email || ""
      };

      return next();
    }

    // CUSTOMER / TECHNICIAN / MANAGER
    const user = await MobileUser.findById(decoded.id).select(
      "_id name mobile loginId role active mustChangePassword"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found."
      });
    }

    if (!user.active) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive. Please contact administrator."
      });
    }

    if (String(user.role).toUpperCase() !== role) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token."
      });
    }

    req.user = {
      id: String(user._id),
      role: user.role,
      name: user.name,
      mobile: user.mobile || "",
      loginId: user.loginId || "",
      active: user.active,
      mustChangePassword: !!user.mustChangePassword
    };

    next();

  } catch (error) {
    console.error("mobileAuth:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
}

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied."
      });
    }

    next();
  };
}

module.exports = {
  mobileAuth,
  allowRoles
};