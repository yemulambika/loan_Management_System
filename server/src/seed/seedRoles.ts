import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const password = await bcrypt.hash("Password@123", 10);
    const users = [
      { name: "Admin User", email: "admin@gmail.com", role: "admin" },
      { name: "Sales User", email: "sales@gmail.com", role: "sales" },
      { name: "Sanction User", email: "sanction@gmail.com", role: "sanction" },
      {
        name: "Disbursement User",
        email: "disbursement@gmail.com",
        role: "disbursement",
      },
      {
        name: "Collection User",
        email: "collection@gmail.com",
        role: "collection",
      },
      { name: "Borrower User", email: "borrower@gmail.com", role: "borrower" },
    ];

    for (const user of users) {
      await User.findOneAndUpdate(
        { email: user.email },
        {
          ...user,
          password,
          hasLoan: false,
          stage: "Registered",
          lastActive: new Date(),
        },
        { upsert: true, new: true }
      );
    }

    console.log("Role users seeded. Password for all: Password@123");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedRoles();
