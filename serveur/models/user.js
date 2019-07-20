const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
  jwt: { type: String },
});

module.exports = moongoose.model("User", userSchema);
