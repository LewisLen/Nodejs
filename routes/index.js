const usersRouter = require("./users");
const moviesRouter = require("./movie");
const mapRouter = require("./map");
const productRouter = require("./product");

module.exports = (app) => {
  app.use("/users", usersRouter);
  app.use("/movies", moviesRouter);
  app.use("/map", mapRouter);
  app.use("/product", productRouter);
  app.use("/", (req, res, next) => {
    res.json({ title: "Express" });
  });
};
