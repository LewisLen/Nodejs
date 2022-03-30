const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1:27017/blog";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("connected", () => {
  console.log("mongodb数据库连接成功");
});
db.on("error", (error) => {
  console.log("mongodb数据库连接失败", error);
});
module.exports = db;
