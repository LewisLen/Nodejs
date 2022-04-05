const userModule = require("../modules/users");

class Users {
  register(req, res, next) {
    console.log(this);
    const { userName, passWord } = req.body || {};
    if (userName && passWord) {
      userModule.findOne({ userName }, (error, doc) => {
        if (error) {
          res.status(423).send({
            message: "查询用户信息失败",
          });
        } else if (doc && doc.userName) {
          res.send({
            message: "注册用户失败，用户名重复",
            returnCode: "000000",
          });
        } else {
          userModule.create(
            {
              userName,
              passWord,
            },
            (err, data) => {
              if (err) {
                res.status(423).send({
                  message: "注册失败",
                });
              } else {
                res.send({
                  message: "登录成功",
                  returnCode: "000000",
                  userName: data.userName,
                });
              }
            }
          );
        }
      });
    } else {
      res.status(423).send({
        message: "注册失败，用户名或密码不存在",
      });
    }
  }
}

module.exports = new Users();
