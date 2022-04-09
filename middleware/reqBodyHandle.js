const querystring = require("querystring");

const reqBodyHandle = (req, res, next) => {
  let reqStr = "";

  req.on("data", (chunk) => {
    reqStr += chunk;
  });

  req.on("end", () => {
    const body = querystring.parse(reqStr);
    req.body = body;
    next();
  });
};

module.exports = reqBodyHandle;
