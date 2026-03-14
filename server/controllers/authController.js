import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Existing User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("--- Login Attempt ---");
  console.log("Request Body:", req.body);

  if (!email || !password) {
    console.log("Login failed: Email or password missing from request.");
    return res
      .status(400)
      .json({ message: "Please provide email and password." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`Login failed: No user found with email ${email}.`);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("User found in DB:", user.email);
    console.log("Password from login form:", password);
    console.log("Hashed password from DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Result of password comparison (isMatch):", isMatch);
    console.log("----------------------");

    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "No user found with that email address" });
    }

    // Generate token securely
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and save to database
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // In a real app, send an email here. For now, log to console.
    const baseUrl = process.env.CORS_ORIGIN || 'http://localhost:5174';
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;

    const message = `You requested a password reset for your SmartResume account.\n\nPlease go to this link to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset - SmartResume',
        message,
        html: `
          <h3>Password Reset Request</h3>
          <p>You requested a password reset for your SmartResume account.</p>
          <p>Please click the link below to reset your password:</p>
          <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background-color:#2563eb;color:#ffffff;text-decoration:none;border-radius:5px;margin:10px 0;">Reset Password</a>
          <p>Or copy and paste this URL into your browser:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p><br>If you did not request this, please ignore this email.</p>
        `
      });

      res.status(200).json({ success: true, message: "Password reset link sent to your email! Please check your inbox." });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });

      console.error("Email sending failed:", err);
      return res.status(500).json({ message: "Email could not be sent. Please check server SMTP configuration." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    // Hash the token from URL to compare against the DB
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired password reset token" });
    }

    // Hash the new password and save
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    // Clear tokens
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
