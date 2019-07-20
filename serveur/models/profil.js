const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const profilSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  birthday: { type: Date },
  sexe: { type: String },
  size: { type: Number },
  weight: { type: Number },
  bloodType: { type: String },
  allergies: { type: String },
  userId: { type: String }
});

module.exports = moongoose.model("Profil", profilSchema);
