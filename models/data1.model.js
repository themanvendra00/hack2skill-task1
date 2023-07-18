const mongoose = require("mongoose");

const data1Schema = mongoose.Schema({
  full_name: String,
  email: String,
  number: String,
  city: String,
  url: String,
});

const Data1 = mongoose.model('data1', data1Schema);

module.exports = Data1;