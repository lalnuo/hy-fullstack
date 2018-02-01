const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const url = process.env.MONGODB_URI;

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name can not be empty"]
  },
  number: {
    type: String,
    required: [true, "Number can not be empty"]
  }
});

personSchema.statics.format = person => ({
  name: person.name,
  id: person._id,
  number: person.number
});

mongoose.connect(url);
mongoose.Promise = global.Promise;

const person = mongoose.model("Person", personSchema);

module.exports = person;
