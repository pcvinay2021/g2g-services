const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    icon: {
      type: String,
      default: "🛠️",
      trim: true
    },

    charge: {
      type: Number,
      required: true,
      min: 0
    },

    active: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "createdByModel"
    },

    createdByModel: {
      type: String,
      required: true,
      enum: ["Admin", "MobileUser"]
    },

    createdByRole: {
      type: String,
      required: true,
      enum: ["ADMIN", "MANAGER"]
    }
  },
  {
    timestamps: true
  }
);

serviceSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Service", serviceSchema);