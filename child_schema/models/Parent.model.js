const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const userSchema = new Schema({
  name: String,
  email: String,
  address: { type: Schema.Types.ObjectId, ref: 'City' }
});

module.exports = mongoose.model("User", userSchema)
  