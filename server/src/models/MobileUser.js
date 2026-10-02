const mongoose = require("mongoose");

const mobileUserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  mobile: { type: String, trim: true, index: true },
  loginId: { type: String, trim: true, uppercase: true, index: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["CUSTOMER", "TECHNICIAN", "MANAGER"],
    required: true
  },
  active: { type: Boolean, default: true },
  mustChangePassword: { type: Boolean, default: false },

  approvalStatus: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "APPROVED"
  },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null
  },

  approvedAt: {
    type: Date,
    default: null
  },

  rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null
  },

  rejectedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

mobileUserSchema.index({ loginId: 1 }, { unique: true, sparse: true });
mobileUserSchema.index({ mobile: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("MobileUser", mobileUserSchema);
