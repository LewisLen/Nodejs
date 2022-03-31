const express = require("express");
const axios = require("axios");
const movieModule = require("../modules/movie");

// 最近热门电影
const newMoviesUrl =
  "https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0";

const highOpinion =
  "https://movie.douban.com/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&sort=recommend&page_limit=20&page_start=0";

const router = express.Router();

/* GET home page. */
router.get("/insertNew", (req, res, next) => {
  axios.get(newMoviesUrl).then((response) => {
    movieModule.insertMany(response.data.subjects, (err, doc) => {
      res.json({
        length: doc && doc.length,
        message: "插入数据成功",
      });
    });
  });
});

router.get("/insertHigh", (req, res, next) => {
  axios.get(highOpinion).then((response) => {
    movieModule.insertMany(response.data.subjects, (err, doc) => {
      res.json({
        length: doc && doc.length,
        message: "插入数据成功",
      });
    });
  });
});

router.get("/query", (req, res, next) => {
  movieModule.find({ title: req.title }, (err, doc) => {
    res.json({
      length: doc && doc.length,
      message: "查询数据成功",
      data: doc,
    });
  });
});

module.exports = router;
