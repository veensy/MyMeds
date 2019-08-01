const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const medSchema = new Schema({
  name: { type: String },
  duration: { type: String },
  startDate: { type: Date },
  dosing: { type: String },
  alarm: { type: Boolean },
  unit: { type: String },
  frequencies: [String],
  profilId: { type: String }
});

module.exports = moongoose.model("Med", medSchema);
