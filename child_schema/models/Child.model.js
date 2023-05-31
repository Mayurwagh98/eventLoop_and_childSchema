const mongoose = require("mongoose")
const {Schema} = require("mongoose")

// Define the child schema
const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  country: String
});

module.exports = mongoose.model("Address", addressSchema)