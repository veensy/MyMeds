const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const medSchema = new Schema({
  name: { type: String },
  duration: { type: Number },
  startDate: { type: Date },
  dosing: { type: Number },
  alarm: { type: Boolean },
  unit: { type: String },
  profilId: { type: String }
});

module.exports = moongoose.model("Med", medSchema);
