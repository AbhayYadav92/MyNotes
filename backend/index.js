import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Import Routes
import noteRoutes from "./routes/note.route.js";
import authRoutes from "./routes/auth.route.js";

// Load .env variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4002;

// -----------------------------
// MongoDB Connection
// -----------------------------
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop server if DB fails
  }
}
connectDB();

// -----------------------------
// Middlewares
// -----------------------------
app.use(cors());
app.use(express.json());

// -----------------------------
// Routes
// -----------------------------

// Auth routes (signup, login)
app.use("/api/v1/auth", authRoutes);

// Notes CRUD routes
app.use("/api/v1/noteapp", noteRoutes);

// Home API default route
app.get("/", (req, res) => {
  res.send("🚀 NoteKeeper API is running successfully!");
});

// -----------------------------
// Start Server
// -----------------------------
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
