const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  status: String,
  by: { type: mongoose.Schema.Types.ObjectId },
  byRole: String,
  note: String,
  at: { type: Date, default: Date.now },
}, { _id: false });

const complaintSchema = new mongoose.Schema({
  complaintNo: { type: String, unique: true, index: true },
  customer: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  customerName: { type: String, required: true },
  phone: String,
  service: { type: String, required: true, trim: true },
  serviceCharge: { type: Number, default: 0, min: 0 },
  address: { type: String, required: true, trim: true },
  details: { type: String, default: "", trim: true },
  technician: { type: mongoose.Schema.Types.ObjectId, default: null, index: true },
  technicianName: { type: String, default: "Not Assigned" },
  manager: { type: mongoose.Schema.Types.ObjectId, default: null },
  priority: { type: String, enum: ["NORMAL", "HIGH", "URGENT"], default: "NORMAL" },
  status: {
    type: String,
    enum: ["NEW", "ASSIGNED", "AT CUSTOMER", "IN PROGRESS", "ESTIMATE SENT", "ADVANCE PENDING", "ADVANCE PAID", "ESTIMATE REJECTED", "COMPLETED", "CLOSED"],
    default: "NEW",
  },
  schedule: { type: Date, default: null },
  partName: { type: String, default: "" },
  partQty: { type: Number, default: 1, min: 1 },
  partUnitPrice: { type: Number, default: 0, min: 0 },
  partCost: { type: Number, default: 0, min: 0 },
  estimateNote: { type: String, default: "" },
  estimateStatus: { type: String, enum: ["NOT_REQUIRED", "PENDING_APPROVAL", "APPROVED", "REJECTED"], default: "NOT_REQUIRED" },
  advancePaid: { type: Boolean, default: false },
  paymentStatus: { type: String, enum: ["PENDING", "PAID"], default: "PENDING" },
  completed: { type: Boolean, default: false },
  history: { type: [historySchema], default: [] },
}, { timestamps: true });

complaintSchema.index({ updatedAt: -1 });

module.exports = mongoose.model("Complaint", complaintSchema);
