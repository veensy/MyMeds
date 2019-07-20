const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const frequencySchema = new Schema({
  hour: [Number],
  medId: { type: String }
});

module.exports = moongoose.model("Frequency", frequencySchema);
