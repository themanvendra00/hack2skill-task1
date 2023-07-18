const mongoose = require("mongoose");

const data2Schema = mongoose.Schema({
  full_name: String,
  email: String,
  team_name: String,
});

const Data2 = mongoose.model("data2", data2Schema);

module.exports = Data2;
