const mongoose = require("mongoose");
const db = require("./db");

const movieSchema = new mongoose.Schema({
  episodes_info: { type: String, default: "" },
  rate: { type: String, default: "" },
  cover_x: { type: Number, default: 0 },
  title: { type: String, default: "" },
  url: { type: String, default: "" },
  playable: Boolean,
  cover: { type: String, default: "" },
  // index为索引值,unique为唯一索引
  id: { type: String, index: true },
  cover_y: { type: Number, default: 0 },
  is_new: { type: Boolean, default: false },
  create_date: { type: Date, default: Date.now },
});

const movieModule = db.model("movies", movieSchema);
module.exports = movieModule;
