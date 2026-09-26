const express = require("express");
const Complaint = require("../models/Complaint");
const MobileUser = require("../models/MobileUser");
const { mobileAuth, allowRoles } = require("../middleware/mobileAuth");

const router = express.Router();

router.use(mobileAuth);

/* =========================================================
   HELPERS
========================================================= */

function idFor(n = 8) {
  return (
    "CMP" +
    Date.now().toString().slice(-n) +
    Math.floor(Math.random() * 90 + 10)
  );
}

function canSee(req, complaint) {
  if (req.user.role === "ADMIN" || req.user.role === "MANAGER") {
    return true;
  }

  if (req.user.role === "CUSTOMER") {
    return String(complaint.customer) === String(req.user.id);
  }

  if (req.user.role === "TECHNICIAN") {
    return String(complaint.technician || "") === String(req.user.id);
  }

  return false;
}

/* =========================================================
   GET ALL / MY COMPLAINTS
   GET /api/.../complaints
========================================================= */

router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.user.role === "CUSTOMER") {
      filter.customer = req.user.id;
    }

    if (req.user.role === "TECHNICIAN") {
      filter.technician = req.user.id;
    }

    if (req.query.updatedSince) {
      const d = new Date(req.query.updatedSince);

      if (!isNaN(d)) {
        filter.updatedAt = { $gt: d };
      }
    }

    const data = await Complaint.find(filter)
      .sort({ updatedAt: -1 })
      .lean();

    res.set("Cache-Control", "no-store");

    res.json({
      success: true,
      serverTime: new Date().toISOString(),
      data
    });

  } catch (e) {
    console.error("GET COMPLAINTS:", e);

    res.status(500).json({
      success: false,
      message: "Unable to load complaints."
    });
  }
});

/* =========================================================
   CREATE COMPLAINT
   CUSTOMER / MANAGER / ADMIN
========================================================= */

router.post(
  "/",
  allowRoles("CUSTOMER", "MANAGER", "ADMIN"),
  async (req, res) => {
    try {
      let customerId = req.user.id;

      // Manager/Admin can create complaint for a customer
      if (
        req.user.role !== "CUSTOMER" &&
        req.body.customerId
      ) {
        customerId = req.body.customerId;
      }

      const c = await MobileUser.findById(customerId);

      if (!c || c.role !== "CUSTOMER") {
        return res.status(404).json({
          success: false,
          message: "Customer not found."
        });
      }

      if (!req.body.service) {
        return res.status(400).json({
          success: false,
          message: "Service is required."
        });
      }

      if (!req.body.address) {
        return res.status(400).json({
          success: false,
          message: "Address is required."
        });
      }

      const priority = String(
        req.body.priority || "NORMAL"
      ).toUpperCase();

      if (!["NORMAL", "HIGH", "URGENT"].includes(priority)) {
        return res.status(400).json({
          success: false,
          message: "Invalid priority."
        });
      }

      const serviceCharge = Number(req.body.serviceCharge);

      const j = await Complaint.create({
        complaintNo: idFor(),

        customer: c._id,

        customerName: c.name,

        phone: req.body.phone || c.mobile,

        service: String(req.body.service).trim(),

        serviceCharge:
          Number.isFinite(serviceCharge) && serviceCharge >= 0
            ? serviceCharge
            : 0,

        address: String(req.body.address).trim(),

        details: req.body.details
          ? String(req.body.details).trim()
          : "",

        priority,

        status: "NEW",

        history: [
          {
            status: "NEW",
            by: req.user.id,
            byRole: req.user.role,
            note: "Complaint created"
          }
        ]
      });

      res.status(201).json({
        success: true,
        data: j
      });

    } catch (e) {
      console.error("CREATE COMPLAINT:", e);

      res.status(400).json({
        success: false,
        message:
          e.message || "Unable to create complaint."
      });
    }
  }
);

/* =========================================================
   UPDATE META
   MANAGER / ADMIN
========================================================= */

router.patch(
  "/:id/meta",
  allowRoles("MANAGER", "ADMIN"),
  async (req, res) => {
    try {
      const j = await Complaint.findById(req.params.id);

      if (!j) {
        return res.status(404).json({
          success: false,
          message: "Complaint not found."
        });
      }

      if (req.body.priority !== undefined) {
        const priority = String(req.body.priority).toUpperCase();

        if (
          !["NORMAL", "HIGH", "URGENT"].includes(priority)
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid priority."
          });
        }

        j.priority = priority;
      }

      if (req.body.schedule !== undefined) {
        if (!req.body.schedule) {
          j.schedule = null;
        } else {
          const schedule = new Date(req.body.schedule);

          if (isNaN(schedule)) {
            return res.status(400).json({
              success: false,
              message: "Invalid schedule date."
            });
          }

          j.schedule = schedule;
        }
      }

      j.history.push({
        status: j.status,
        by: req.user.id,
        byRole: req.user.role,
        note:
          req.body.note ||
          "Complaint details updated"
      });

      await j.save();

      res.json({
        success: true,
        data: j
      });

    } catch (e) {
      console.error("UPDATE META:", e);

      res.status(400).json({
        success: false,
        message:
          "Unable to update complaint details."
      });
    }
  }
);

/* =========================================================
   ASSIGN TECHNICIAN
   MANAGER / ADMIN
========================================================= */

router.patch(
  "/:id/assign",
  allowRoles("MANAGER", "ADMIN"),
  async (req, res) => {
    try {
      if (!req.body.technicianId) {
        return res.status(400).json({
          success: false,
          message: "Technician ID is required."
        });
      }

      const tech = await MobileUser.findOne({
        _id: req.body.technicianId,
        role: "TECHNICIAN",
        active: true
      });

      if (!tech) {
        return res.status(404).json({
          success: false,
          message: "Technician not found."
        });
      }

      const j = await Complaint.findById(
        req.params.id
      );

      if (!j) {
        return res.status(404).json({
          success: false,
          message: "Complaint not found."
        });
      }

      j.technician = tech._id;

      j.technicianName = tech.name;

      if (req.user.role === "MANAGER") {
        j.manager = req.user.id;
      }

      j.status = "ASSIGNED";

      j.history.push({
        status: "ASSIGNED",
        by: req.user.id,
        byRole: req.user.role,
        note: `Assigned to ${tech.name}`
      });

      await j.save();

      res.json({
        success: true,
        data: j
      });

    } catch (e) {
      console.error("ASSIGN TECHNICIAN:", e);

      res.status(400).json({
        success: false,
        message: "Unable to assign complaint."
      });
    }
  }
);

/* =========================================================
   UPDATE STATUS
========================================================= */

router.patch("/:id/status", async (req, res) => {
  try {
    const j = await Complaint.findById(
      req.params.id
    );

    if (!j) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found."
      });
    }

    if (!canSee(req, j)) {
      return res.status(403).json({
        success: false,
        message: "Access denied."
      });
    }

    /*
      IMPORTANT:

      ADVANCE PAID is NOT handled here.

      Advance payment must use:
      PATCH /:id/payment

      This prevents status and payment from being
      updated independently.
    */

    const allowed = {
      CUSTOMER: [
        "CLOSED"
      ],

      TECHNICIAN: [
        "AT CUSTOMER",
        "IN PROGRESS",
        "ESTIMATE SENT",
        "COMPLETED"
      ],

      MANAGER: [
        "ASSIGNED",
        "AT CUSTOMER",
        "IN PROGRESS",
        "COMPLETED",
        "CLOSED"
      ],

      ADMIN: [
        "ASSIGNED",
        "AT CUSTOMER",
        "IN PROGRESS",
        "ESTIMATE SENT",
        "ADVANCE PENDING",
        "COMPLETED",
        "CLOSED"
      ]
    };

    const status = String(
      req.body.status || ""
    )
      .trim()
      .toUpperCase();

    if (
      !allowed[req.user.role] ||
      !allowed[req.user.role].includes(status)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "This role cannot set that status."
      });
    }

    if (status === "COMPLETED") {
      j.completed = true;
    }

    if (status === "CLOSED") {
      if (!j.completed) {
        return res.status(400).json({
          success: false,
          message:
            "Complaint must be completed before closing."
        });
      }

      if (j.paymentStatus !== "PAID") {
        return res.status(400).json({
          success: false,
          message:
            "Final payment is required before closing the complaint."
        });
      }
    }

    j.status = status;

    j.history.push({
      status,
      by: req.user.id,
      byRole: req.user.role,
      note:
        req.body.note ||
        "Status updated"
    });

    await j.save();

    res.json({
      success: true,
      data: j
    });

  } catch (e) {
    console.error("UPDATE STATUS:", e);

    res.status(400).json({
      success: false,
      message:
        "Unable to update status."
    });
  }
});

/* =========================================================
   PARTS / ESTIMATE
   TECHNICIAN / MANAGER / ADMIN
========================================================= */

router.patch(
  "/:id/parts",
  allowRoles(
    "TECHNICIAN",
    "MANAGER",
    "ADMIN"
  ),
  async (req, res) => {
    try {
      const j = await Complaint.findById(
        req.params.id
      );

      if (!j) {
        return res.status(404).json({
          success: false,
          message: "Complaint not found."
        });
      }

      // Technician can only update assigned complaint
      if (
        req.user.role === "TECHNICIAN" &&
        String(j.technician) !==
          String(req.user.id)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Complaint is not assigned to you."
        });
      }

      const qty = Number(
        req.body.partQty
      );

      const unitPrice = Number(
        req.body.partUnitPrice
      );

      j.partName =
        req.body.partName
          ? String(req.body.partName).trim()
          : "";

      j.partQty =
        Number.isFinite(qty) && qty > 0
          ? qty
          : 1;

      j.partUnitPrice =
        Number.isFinite(unitPrice) &&
        unitPrice >= 0
          ? unitPrice
          : 0;

      j.partCost =
        j.partQty *
        j.partUnitPrice;

      j.estimateNote =
        req.body.estimateNote
          ? String(
              req.body.estimateNote
            ).trim()
          : "";

      if (j.partCost > 0) {
        j.estimateStatus =
          "PENDING_APPROVAL";

        j.status =
          "ESTIMATE SENT";
      } else {
        j.estimateStatus =
          "NOT_REQUIRED";

        j.status =
          "IN PROGRESS";
      }

      j.history.push({
        status: j.status,
        by: req.user.id,
        byRole: req.user.role,
        note:
          "Part estimate updated"
      });

      await j.save();

      res.json({
        success: true,
        data: j
      });

    } catch (e) {
      console.error("UPDATE PARTS:", e);

      res.status(400).json({
        success: false,
        message:
          "Unable to update parts."
      });
    }
  }
);

/* =========================================================
   ESTIMATE APPROVAL
   CUSTOMER / ADMIN
========================================================= */

router.patch(
  "/:id/estimate",
  allowRoles("CUSTOMER", "ADMIN"),
  async (req, res) => {
    try {
      const j = await Complaint.findById(
        req.params.id
      );

      if (!j) {
        return res.status(404).json({
          success: false,
          message: "Complaint not found."
        });
      }

      if (
        req.user.role === "CUSTOMER" &&
        String(j.customer) !==
          String(req.user.id)
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied."
        });
      }

      if (!j.partCost) {
        return res.status(400).json({
          success: false,
          message:
            "No part estimate exists."
        });
      }

      if (
        j.estimateStatus !==
        "PENDING_APPROVAL"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "This estimate is not pending approval."
        });
      }

      const approved =
        req.body.approved === true;

      j.estimateStatus =
        approved
          ? "APPROVED"
          : "REJECTED";

      j.status =
        approved
          ? "ADVANCE PENDING"
          : "ESTIMATE REJECTED";

      j.history.push({
        status: j.status,
        by: req.user.id,
        byRole: req.user.role,
        note: approved
          ? "Estimate approved"
          : "Estimate rejected"
      });

      await j.save();

      res.json({
        success: true,
        data: j
      });

    } catch (e) {
      console.error("ESTIMATE:", e);

      res.status(400).json({
        success: false,
        message:
          "Unable to update estimate."
      });
    }
  }
);

/* =========================================================
   PAYMENT
   CUSTOMER / ADMIN
========================================================= */

router.patch(
  "/:id/payment",
  allowRoles("CUSTOMER", "ADMIN"),
  async (req, res) => {
    try {
      const j = await Complaint.findById(
        req.params.id
      );

      if (!j) {
        return res.status(404).json({
          success: false,
          message: "Complaint not found."
        });
      }

      if (
        req.user.role === "CUSTOMER" &&
        String(j.customer) !==
          String(req.user.id)
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied."
        });
      }

      const type = String(
        req.body.type || ""
      )
        .trim()
        .toLowerCase();

      /* =========================
         ADVANCE PAYMENT
      ========================= */

      if (type === "advance") {
        if (
          j.estimateStatus !==
          "APPROVED"
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Advance payment is allowed only after estimate approval."
          });
        }

        if (j.advancePaid) {
          return res.status(400).json({
            success: false,
            message:
              "Advance payment is already marked as paid."
          });
        }

        j.advancePaid = true;

        j.status =
          "ADVANCE PAID";
      }

      /* =========================
         FINAL PAYMENT
      ========================= */

      else if (type === "final") {
        if (!j.completed) {
          return res.status(400).json({
            success: false,
            message:
              "Final payment is allowed only after complaint is completed."
          });
        }

        if (
          j.paymentStatus ===
          "PAID"
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Final payment is already marked as paid."
          });
        }

        j.paymentStatus =
          "PAID";

        j.status =
          "CLOSED";
      }

      /* =========================
         INVALID TYPE
      ========================= */

      else {
        return res.status(400).json({
          success: false,
          message:
            "Invalid payment type."
        });
      }

      j.history.push({
        status: j.status,
        by: req.user.id,
        byRole: req.user.role,
        note:
          `${type} payment updated`
      });

      await j.save();

      res.json({
        success: true,
        data: j
      });

    } catch (e) {
      console.error("PAYMENT:", e);

      res.status(400).json({
        success: false,
        message:
          "Unable to update payment."
      });
    }
  }
);

/* =========================================================
   EXPORT
========================================================= */

module.exports = router;