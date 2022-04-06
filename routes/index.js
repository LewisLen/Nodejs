const usersRouter = require("./users");
const moviesRouter = require("./movie");

module.exports = (app) => {
  app.use("/", (req, res, next) => {
    res.json({ title: "Express" });
  });
  app.use("/users", usersRouter);
  app.use("/movies", moviesRouter);
};
