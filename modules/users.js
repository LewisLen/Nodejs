const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const db = require("./db");

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  passWord: {
    type: String,
    set(val) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(val, salt);
      return hash;
    },
  },
});

const userModule = db.model("users", userSchema);

module.exports = userModule;
