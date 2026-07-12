import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "../modules/users/user.model.js";
import { ROLES } from "../constants/roles.constants.js";

try {
  await mongoose.connect(process.env.MONGO_URI);

  const exists = await User.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (exists) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await User.create({
    fullName: {
      firstName: "LeaseStay",
      lastName: "Admin",
    },
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: ROLES.ADMIN,
  });

  console.log("Admin created successfully");
} catch (error) {
  console.error("Error:", error);
} finally {
  await mongoose.connection.close();
  process.exit(0);
}
