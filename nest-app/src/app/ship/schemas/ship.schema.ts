import * as mongoose from "mongoose";

export const ShipSchema = new mongoose.Schema({
  name: String,
  speed: Number,
  crew: Number,
});
