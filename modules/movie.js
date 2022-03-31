const mongoose = require("mongoose");
const db = require("./db");

const movieSchema = new mongoose.Schema({
  episodes_info: String,
  rate: String,
  cover_x: Number,
  title: String,
  url: String,
  playable: Boolean,
  cover: String,
  id: { type: String, index: true, unique: true },
  cover_y: Number,
  is_new: Boolean,
  create_date: { type: Date, default: Date.now },
});

const movieModule = db.model("movies", movieSchema);
module.exports = movieModule;
