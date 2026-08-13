const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();

const app = express();
const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminCareerRoutes = require("./routes/adminCareerRoutes");


// MongoDB
connectDB();


// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static uploads
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "G2G Services Backend API is running",
  });
});

// Routes

app.use("/api/contact", contactRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/careers", adminCareerRoutes);


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

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`G2G Backend running on port ${PORT}`);
});