import express from "express";
import Fisherman from "../models/Fishermen.js";

const router = express.Router();

router.post("/verify-boat", async (req, res) => {

  try {

    const { boatId } = req.body;

    const fisherman = await Fisherman.findOne({
      boatId: boatId.trim()
    });

    if (!fisherman) {
      return res.json({
        success: false,
        message: "Invalid Boat ID"
      });
    }

    res.json({
      success: true,
      fisherman
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});

export default router;