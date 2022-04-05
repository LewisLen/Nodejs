const usersRouter = require("./users");
const moviesRouter = require("./movie");

module.exports = (app) => {
  app.use("/users", usersRouter);
  app.use("/movies", moviesRouter);
};
