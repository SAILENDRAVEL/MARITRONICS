import mongoose from "mongoose";

const fishermanSchema = new mongoose.Schema({

  name: String,

  boatId: String,

  district: String

});

export default mongoose.model("Fisherman", fishermanSchema);