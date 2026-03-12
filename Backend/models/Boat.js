import mongoose from "mongoose";

const boatSchema = new mongoose.Schema({
  name: String,
  boatId: String,
  district: String
});

const Boat = mongoose.model("Boat", boatSchema);

export default Boat;