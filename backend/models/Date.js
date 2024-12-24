const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
  date: { type: Date, required: true }
});

module.exports = mongoose.model("Date", dateSchema);
