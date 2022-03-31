const mongoose = require("mongoose");
const db = require("./db");

const movieSchema = new mongoose.Schema({
  episodes_info: { type: String },
  rate: { type: String },
  cover_x: { type: Number },
  title: { type: String },
  url: { type: String },
  playable: { type: Boolean },
  cover: { type: String },
  id: { type: String },
  cover_y: { type: Number },
  is_new: { type: Boolean },
});
const movieModule = db.model("movies", movieSchema);
module.exports = movieModule;
