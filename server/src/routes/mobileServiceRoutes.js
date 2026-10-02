const express = require("express");
const Service = require("../models/Service");
const { mobileAuth, allowRoles } = require("../middleware/mobileAuth");

const router = express.Router();

/*
  All service APIs require mobile authentication.
*/
router.use(mobileAuth);

/*
  GET /api/mobile/services

  ADMIN / MANAGER:
  - See all services

  CUSTOMER / TECHNICIAN:
  - See active services only
*/
router.get("/", async (req, res) => {
  try {
    const query =
      req.user.role === "ADMIN" || req.user.role === "MANAGER"
        ? {}
        : { active: true };

    const services = await Service.find(query)
      .sort({ name: 1 })
      .lean();

    res.json({
      success: true,
      data: services
    });
  } catch (e) {
    console.error("GET SERVICES:", e);

    res.status(500).json({
      success: false,
      message: "Unable to load services."
    });
  }
});

/*
  POST /api/mobile/services

  ADMIN / MANAGER can create services.
*/
router.post(
  "/",
  allowRoles("ADMIN", "MANAGER"),
  async (req, res) => {
    try {
      const name = String(req.body.name || "").trim();
      const icon = String(req.body.icon || "🛠️").trim();
      const charge = Number(req.body.charge);

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Service name is required."
        });
      }

      if (!Number.isFinite(charge) || charge < 0) {
        return res.status(400).json({
          success: false,
          message: "Valid service charge is required."
        });
      }

      const existing = await Service.findOne({
        name: { $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" }
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Service already exists."
        });
      }

      const createdByModel =
        req.user.role === "ADMIN" ? "Admin" : "MobileUser";

      const service = await Service.create({
        name,
        icon,
        charge,
        active: true,
        createdBy: req.user.id,
        createdByModel,
        createdByRole: req.user.role
      });

      res.status(201).json({
        success: true,
        message: "Service created successfully.",
        data: service
      });
    } catch (e) {
      console.error("CREATE SERVICE:", e);

      if (e.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Service already exists."
        });
      }

      res.status(500).json({
        success: false,
        message: "Unable to create service."
      });
    }
  }
);

/*
  PATCH /api/mobile/services/:id

  ADMIN / MANAGER can update service.
*/
router.patch(
  "/:id",
  allowRoles("ADMIN", "MANAGER"),
  async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found."
        });
      }

      if (req.body.name !== undefined) {
        const name = String(req.body.name).trim();

        if (!name) {
          return res.status(400).json({
            success: false,
            message: "Service name cannot be empty."
          });
        }

        service.name = name;
      }

      if (req.body.icon !== undefined) {
        service.icon = String(req.body.icon).trim() || "🛠️";
      }

      if (req.body.charge !== undefined) {
        const charge = Number(req.body.charge);

        if (!Number.isFinite(charge) || charge < 0) {
          return res.status(400).json({
            success: false,
            message: "Invalid service charge."
          });
        }

        service.charge = charge;
      }

      if (req.body.active !== undefined) {
        service.active = Boolean(req.body.active);
      }

      await service.save();

      res.json({
        success: true,
        message: "Service updated successfully.",
        data: service
      });
    } catch (e) {
      console.error("UPDATE SERVICE:", e);

      if (e.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Service name already exists."
        });
      }

      res.status(500).json({
        success: false,
        message: "Unable to update service."
      });
    }
  }
);

/*
  DELETE /api/mobile/services/:id

  Only ADMIN can permanently delete a service.
*/
router.delete(
  "/:id",
  allowRoles("ADMIN"),
  async (req, res) => {
    try {
      const service = await Service.findByIdAndDelete(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found."
        });
      }

      res.json({
        success: true,
        message: "Service deleted successfully."
      });
    } catch (e) {
      console.error("DELETE SERVICE:", e);

      res.status(500).json({
        success: false,
        message: "Unable to delete service."
      });
    }
  }
);

module.exports = router;