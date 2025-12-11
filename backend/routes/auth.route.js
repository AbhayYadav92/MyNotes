import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = express.Router();

/* ---------------------------------------------
   ⭐ SIGNUP USER
---------------------------------------------- */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ---------------------------------------------
   ⭐ LOGIN USER
---------------------------------------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Field check
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    // User check
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    // Password verify
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    // JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
