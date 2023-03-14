const chinaMapModule = require("../modules/product");

class ProductList {
  // 查询
  query(req, res, next) {
    const params = {};
    const types = req.query.types || req.body.types || "";
    if (req.query.types || req.body.types) {
      params.types = types;
    }
    const _chinaMap = chinaMapModule.find(params);
    // 按条件筛选
    // pageSize: 5, pageNumber: 2, skip: (pageNumber - 1) * pageNumber
    // mapModule.find(params).skip(1).limit(5);
    _chinaMap.exec((err, doc) => {
      const resData = doc[0][types] || {};
      res.json({
        length: doc && doc.length,
        message: "查询数据成功",
        data: resData,
        returnCode: "000000",
      });
    });
  }
}

module.exports = new ProductList();
