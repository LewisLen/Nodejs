const mongoose = require("mongoose");
// const { createHmac } = require("crypto");
const bcrypt = require("bcryptjs");
const db = require("./db");

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  passWord: {
    type: String,
    set(val) {
      // node自带crypto进行加密，这里加密之后对应的解密比较密码也要一致，不然会报错
      // const salt = "al*@2022";
      // const hash = createHmac("md5", salt).update(val).digest("hex");
      // 通过bcryptjs对保存的密码进行加密
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(val, salt);
      return hash;
    },
  },
});

const userModule = db.model("users", userSchema);

module.exports = userModule;
