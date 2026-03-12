import express from "express";
import Fisherman from "../models/Fishermen.js";

const router = express.Router();

router.post("/add-boat", async (req,res)=>{

  try{

    const {name,boatId,district} = req.body;

    const boat = new Fisherman({
      name,
      boatId,
      district
    });

    await boat.save();

    res.json({
      message:"Boat added successfully"
    });

  }
  catch(err){

    console.log(err);

    res.status(500).json({
      message:"Error adding boat"
    });

  }

});

export default router;