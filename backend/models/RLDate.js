const mongoose = require("mongoose");

const RLdateSchema = new mongoose.Schema({
  date: { type: Date, required: true }
});

module.exports = mongoose.model("RLDate", RLdateSchema);
