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
    movieModule
      .insertMany(response.data.subjects)
      .then((docs) => {
        res.json({
          length: docs && docs.length,
          message: "插入数据成功",
          returnCode: "000000",
        });
      })
      .catch((err) => {
        res.json({
          err,
          message: "插入数据失败",
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
        returnCode: "000000",
      });
    });
  });
});

router.get("/query", (req, res, next) => {
  const params = {};
  const title = req.query.title || req.body.title;
  if (req.query.title || req.body.title) {
    params.title = title;
  }
  console.log(params);
  movieModule.find(params, (err, doc) => {
    res.json({
      length: doc && doc.length,
      message: "查询数据成功",
      data: doc,
      returnCode: "000000",
    });
  });
  // .select()
  // .exec((err, doc) => {
  //   res.json({
  //     length: doc && doc.length,
  //     message: "查询数据成功",
  //     data: doc,
  //   });
  // });
});

// 条件查询
router.get("/queryHigh", (req, res, next) => {
  movieModule
    .where("rate")
    .gt(9.5)
    .exec((err, doc) => {
      res.json({
        length: doc && doc.length,
        message: "查询数据成功",
        data: doc,
      });
    });
});

module.exports = router;
