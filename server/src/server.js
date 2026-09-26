const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Existing website/admin routes
const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminCareerRoutes = require("./routes/adminCareerRoutes");

// Mobile application routes
const mobileAuthRoutes = require("./routes/mobileAuthRoutes");
const mobileStaffRoutes = require("./routes/mobileStaffRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const customerRoutes = require("./routes/customerRoutes");

const {
  startPosterScheduler,
} = require("./services/posterScheduler");

// MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "capacitor://localhost",
  "http://localhost",
  "https://localhost",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      // such as Postman/server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "G2G Services Backend API is running",
    status: "LIVE",
  });
});

// Health / readiness check
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;

  res.status(dbState === 1 ? 200 : 503).json({
    success: dbState === 1,
    api: "LIVE",
    database: dbState === 1 ? "CONNECTED" : "DISCONNECTED",
    time: new Date().toISOString(),
  });
});

// Existing website/admin APIs
app.use("/api/contact", contactRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/careers", adminCareerRoutes);

// Mobile application APIs
app.use("/api/mobile/auth", mobileAuthRoutes);
app.use("/api/mobile/staff", mobileStaffRoutes);
app.use("/api/mobile/complaints", complaintRoutes);
app.use("/api/mobile/customers", customerRoutes);

// Server
const PORT = process.env.PORT || 5000;

// Central error handler
app.use((error, req, res, next) => {
  console.error("API Error:", error);

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size must be 5 MB or less.",
    });
  }

  if (error.message?.includes("Only PDF, DOC and DOCX")) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error.message?.includes("CORS blocked origin")) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`G2G Backend running on port ${PORT}`);
});
