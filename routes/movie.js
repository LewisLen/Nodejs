const express = require("express");

const router = express.Router();
const movie = require("../controller/movie");

// 插入新电影
router.get("/insertNew", movie.insertNewMovie);
// 插入高分电影
router.get("/insertHigh", movie.insertHigh);
// 查询
router.get("/query", movie.query);

module.exports = router;
