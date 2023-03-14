const express = require("express");

const router = express.Router();
const product = require("../controller/product");

// 查询
router.get("/query", product.query);

module.exports = router;
