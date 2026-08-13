const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const Admin = require("./models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/g2gservices";

    const email = (
      process.env.ADMIN_EMAIL || "admin@g2gservices.in"
    ).toLowerCase().trim();

    const password = process.env.ADMIN_PASSWORD;
    const name =
      process.env.ADMIN_NAME || "G2G Administrator";

    if (!password) {
      throw new Error(
        "ADMIN_PASSWORD is required in server/.env before creating an admin."
      );
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists.");
      await mongoose.disconnect();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("G2G admin created successfully:", email);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Create Admin Error:", error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

createAdmin();
