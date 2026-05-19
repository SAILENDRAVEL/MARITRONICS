import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import boatRoutes from "./routes/boatRoutes.js";

dotenv.config();

const app = express();

/* Middleware */

app.use(cors({
  origin: "*"
}));

app.use(express.json());

/* Routes */

app.use("/api/auth", authRoutes);
app.use("/api/boat", boatRoutes);

/* Test Route */

app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

const PORT = process.env.PORT || 5000;

/* MongoDB Connection */

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("✅ MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

})
.catch((err) => {

  console.log("❌ MongoDB Error:", err.message);

});