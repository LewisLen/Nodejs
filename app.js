const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { createWriteStream } = require("fs");
const expressArtTemplate = require("express-art-template");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movie");

const app = express();

// 日志文件信息
const accessLogStream = createWriteStream(
  path.join(__dirname, "./logs/requestLog.txt"),
  { flags: "a", encoding: "utf8" }
);

// 用art-template模板引擎渲染html
app.engine(".html", expressArtTemplate);
app.set("views", {
  debug: process.env.NODE_ENV !== "production",
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".html");

// 将请求信息打印在控制台，便于开发调试 dev是morgan一种简短的日志模式
// app.use(morgan("dev"));
// 将日志信息输出到指定文件目录
morgan.format(
  "Blog",
  '[Blog] :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status ":user-agent" :response-time[digits]'
);
// 使用自定义的format
app.use(morgan("Blog"));
app.use(morgan("Blog", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
