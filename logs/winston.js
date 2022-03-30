/*  多container及多transport组合 */
const path = require("path");
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf } = format;

const myFormat = printf((info) => {
  // 日志信息有四个属性level, message, label, timestamp
  const { level, message } = info;
  return `${info.timestamp} ${level}: ${message}`;
});
const winstonLogger = createLogger({
  level: "error",
  format: combine(timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }), myFormat),
  // 输出机制
  transports: [
    // 控制台输出
    new transports.Console(),
    // 文件输出日志信息
    new transports.File({
      filename: path.join(__dirname, "./error.log"),
    }),
  ],
});
module.exports = winstonLogger;
