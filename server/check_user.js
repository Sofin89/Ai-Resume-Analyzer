
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

async function checkUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    const user = await User.findOne({ email: "sofinmansuri0@gmail.com" });
    if (user) {
      console.log("User found:", user.email);
      console.log("Password hash in DB:", user.password);
    } else {
      console.log("User not found");
    }
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

checkUser();
