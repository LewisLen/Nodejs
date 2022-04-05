const axios = require("axios");
const movieModule = require("../modules/movie");

const newMoviesUrl =
  "https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0";
// 高分电影
const highOpinion =
  "https://movie.douban.com/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&sort=recommend&page_limit=20&page_start=0";

class Movie {
  // 插入
  insertNewMovie(req, res, next) {
    axios
      .get(newMoviesUrl)
      .then((response) => {
        movieModule.insertMany(response.data.subjects, (err, docs) => {
          if (err) {
            res.json({
              err,
              message: "插入最新电影数据失败",
            });
          } else {
            res.json({
              length: docs && docs.length,
              message: "插入数据成功",
              returnCode: "000000",
            });
          }
        });
      })
      .catch((error) => {
        res.json({
          error,
          message: "查询最新电影数据失败",
        });
      });
  }

  // 插入高分电影
  insertHigh(req, res, next) {
    axios
      .get(highOpinion)
      .then((response) => {
        movieModule.insertMany(response.data.subjects, (err, docs) => {
          if (err) {
            res.json({
              message: "插入高分电影数据失败",
            });
          } else {
            res.json({
              length: docs && docs.length,
              message: "插入数据成功",
              returnCode: "000000",
            });
          }
        });
      })
      .catch((error) => {
        res.json({
          message: "查询高分电影数据失败",
        });
      });
  }

  // 查询
  query(req, res, next) {
    const params = {};
    const title = req.query.title || req.body.title || "";
    if (req.query.title || req.body.title) {
      params.title = title;
    }
    const movie = movieModule.find(params);
    movie.exec((err, doc) => {
      res.json({
        length: doc && doc.length,
        message: "查询数据成功",
        data: doc,
        returnCode: "000000",
      });
    });
  }
}

module.exports = new Movie();
