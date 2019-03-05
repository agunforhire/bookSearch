const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Books = new Schema(
  {
    title: String,
    authors: String,
    description: String,
    image: String,
    link: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", Books);