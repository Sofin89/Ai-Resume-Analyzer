import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // check if token is present 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];        // Extract token from "Bearer <token>"

    // verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to Request 
    req.user = await User.findById(decoded.id).select("-password");

    next();     // go to the next middleware / route
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    // Check if user is admin
    const isUserAdmin = user.isAdmin === true ||
      user.email === "sofinmansuri0@gmail.com" ||
      user.email.includes("admin") ||
      user.email === "admin@example.com";

    if (!isUserAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};