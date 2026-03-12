import express from "express";
import Boat from "../models/Boat.js";

const router = express.Router();

/* ---------------- ADD BOAT (ADMIN) ---------------- */

router.post("/addBoat", async (req, res) => {

  const { name, boatId, district } = req.body;

  try {

    const newBoat = new Boat({
      name,
      boatId,
      district
    });

    await newBoat.save();

    res.json({
      success: true,
      message: "Boat added successfully"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

});


/* ---------------- VALIDATE BOAT ---------------- */

router.post("/validateBoat", async (req, res) => {

  const { name, boatId, district } = req.body;

  try {

    const boat = await Boat.findOne({
      name,
      boatId,
      district
    });

    if (boat) {

      res.json({
        valid: true
      });

    } else {

      res.json({
        valid: false
      });

    }

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

export default router;
/* GET ALL BOATS */

router.get("/allBoats", async (req, res) => {

  try {

    const boats = await Boat.find();

    res.json(boats);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});


/* DELETE BOAT */

router.delete("/deleteBoat/:id", async (req, res) => {

  try {

    await Boat.findByIdAndDelete(req.params.id);

    res.json({ message: "Boat deleted successfully" });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});