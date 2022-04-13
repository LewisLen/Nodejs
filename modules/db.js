const mongoose = require("mongoose");

const mongoDBUrl = "mongodb://127.0.0.1:27017/blog";
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // 限定用户名唯一性
  // useCreateIndex: true, // 不支持
});
const db = mongoose.connection;
// 或者createConnection
// const db = mongoose.createConnection(doc,{ useNewUrlParser: true,useUnifiedTopology: true });
db.on("connected", () => {
  console.log("mongodb数据库连接成功:", mongoDBUrl);
});
db.on("error", (error) => {
  console.log("mongodb数据库连接失败", error);
});
db.on("disconnected", (error) => {
  console.log("断开连接", error);
});

module.exports = db;
