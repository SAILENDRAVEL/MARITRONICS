import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

// ✅ REGISTER ROUTE WITH ERROR HANDLING
router.post("/register", async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ message: err.message || "Server error in register" });
  }
});

// ✅ LOGIN ROUTE WITH ERROR HANDLING
router.post("/login", async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ message: err.message || "Server error in login" });
  }
});

export default router;