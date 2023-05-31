const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const citySchema = new Schema({
  name: String,
  country: String,
  population: Number
});

module.exports = mongoose.model("City", citySchema)