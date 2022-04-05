const express = require("express");

const router = express.Router();
const movie = require("../controller/movie");

// 插入新电影
router.get("/insertNew", movie.insertNewMovie);
// 插入高分电影
router.get("/insertHigh", movie.insertHigh);
// 查询
router.get("/query", movie.query);
// 删除
router.post("/delete", movie.deleteMovie);
// 更新
router.post("/update", movie.updateMovie);

module.exports = router;
