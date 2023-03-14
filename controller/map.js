const chinaMapModule = require("../modules/map");

class ChinaMap {
  // 查询
  query(req, res, next) {
    const params = {};
    const title = req.query.title || req.body.title || "";
    if (req.query.title || req.body.title) {
      params.title = title;
    }
    const _chinaMap = chinaMapModule.find(params);
    // 按条件筛选
    // pageSize: 5, pageNumber: 2, skip: (pageNumber - 1) * pageNumber
    // mapModule.find(params).skip(1).limit(5);
    _chinaMap.exec((err, doc) => {
      res.json({
        length: doc && doc.length,
        message: "查询数据成功111",
        data: doc,
        returnCode: "000000",
      });
    });
  }
}

module.exports = new ChinaMap();
