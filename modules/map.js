const mongoose = require("mongoose");
const db = require("./db");

const chainMapSchema = new mongoose.Schema({
  features: {
    type: [],
    default: [],
  },
});

const chinaMapModule = db.model("chinamaps", chainMapSchema);
module.exports = chinaMapModule;
