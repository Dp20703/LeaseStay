import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { ROLES } from "../constants/roles.constants.js";
import User from "../modules/users/user.model.js";

try {
  await mongoose.connect(process.env.MONGO_URI);

  const exists = await User.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (exists) {
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
} catch (error) {
  console.error("Error:", error);
} finally {
  await mongoose.connection.close();
  process.exit(0);
}
