const mongoose = require("mongoose");
const db = require("./db");

const productSchema = new mongoose.Schema({
  chartData1: {
    type: Array,
    default: [
      {
        title: String,
        num: Number,
      },
    ],
  },
  chartData2: {
    type: Array,
    default: [],
  },
  chartData3: {
    type: Array,
    default: [],
  },
  chartData4: {
    type: Array,
    default: [],
  },
});

const movieModule = db.model("ones", productSchema);
module.exports = movieModule;
