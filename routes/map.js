const express = require("express");

const router = express.Router();
const chinaMap = require("../controller/map");

// 查询
router.get("/query", chinaMap.query);

module.exports = router;
