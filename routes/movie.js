const express = require("express");
const request = require("request");
const movieModule = require("../modules/movie");

const url =
  "https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0";

const router = express.Router();

/* GET home page. */
router.get("/getMovies", (req, res, next) => {
  request.get(url, (e, r, resData) => {
    res.end(resData);

    // movieModule.insertMany(resData.subjects, (err, data) => {
    //   res.json(data);
    // });
  });
  // movieModule.find({}, (err, doc) => {
  //   res.json(doc);
  // });
});

module.exports = router;
