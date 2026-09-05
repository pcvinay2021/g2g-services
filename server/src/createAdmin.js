const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const Admin = require("./models/Admin");

dotenv.config();
dotenv.config({
  path: require("path").join(__dirname, "../.env")
});

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
        "ADMIN_PASSWORD is required before creating/updating an admin."
      );
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      existingAdmin.name = name;
      existingAdmin.password = hashedPassword;
      existingAdmin.role = "admin";

      await existingAdmin.save();

      console.log("G2G admin password updated successfully:", email);

      await mongoose.disconnect();
      process.exit(0);
    }

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
    console.error("Create/Update Admin Error:", error.message);

    await mongoose.disconnect().catch(() => {});

    process.exit(1);
  }
};

createAdmin();