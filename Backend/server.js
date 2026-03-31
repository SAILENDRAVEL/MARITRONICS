import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import boatRoutes from "./routes/boatRoutes.js";

dotenv.config();

const app = express();

/* Middleware */

// ✅ UPDATED CORS (IMPORTANT FOR VERCEL)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ ADD THIS
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ ADD THIS
  })
);

// ✅ HANDLE PREFLIGHT (VERY IMPORTANT)
app.options("*", cors());

app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/boat", boatRoutes);

// ✅ OPTIONAL HEALTH CHECK (FOR RENDER)
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });