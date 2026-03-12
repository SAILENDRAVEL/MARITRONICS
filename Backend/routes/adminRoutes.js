const express = require("express");
const router = express.Router();
const Boat = require("../models/Boat");

router.post("/addBoat", async (req, res) => {

  const { name, boatId, district } = req.body;

  try {

    const newBoat = new Boat({
      name,
      boatId,
      district
    });

    await newBoat.save();

    res.json({ message: "Boat Added Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;