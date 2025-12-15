// ===== Imports =====
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ===== Config =====
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors({
  origin: "http://localhost:5174", // your Vite client
}));
app.use(express.json());

// ===== Test Route (DO NOT REMOVE) =====
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is alive!" });
});

// ===== Start Server =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
