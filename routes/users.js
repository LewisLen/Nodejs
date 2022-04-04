const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModule = require("../modules/users");

const router = express.Router();

// 秘钥
const SECRET = "kelly138**138kelly";

// 注册用户
router.post("/register", (req, res) => {
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
});

// 登录
router.post("/login", (req, res) => {
  const userInfo = userModule.findOne({
    userName: req.body.userName,
  });
  userInfo.exec((err, responseData) => {
    const { userName, passWord, _id } = responseData || {};
    if (!userName) {
      return res.status(423).send({
        message: "用户名不存在",
      });
    }
    const isPassWordValid = bcrypt.compareSync(
      req.body.passWord,
      passWord || ""
    );
    if (!isPassWordValid) {
      return res.status(423).send({
        message: "密码不正确",
      });
    }
    // sign方法将用户信息加密成jwt字符串
    // 参数：用户信息，密钥，有效时间
    const token = jwt.sign(
      {
        id: String(_id),
        userName,
      },
      SECRET,
      // 有效时间 格式60*60*24单位是秒
      { expiresIn: 10 * 60 }
    );
    res.send({
      message: "登录成功",
      returnCode: "000000",
      userName,
      token,
    });
  });
});

// 校验token
const auth = async (req, res, next) => {
  // 获取客户端请求头的token
  const rawToken = String(req.headers.authorization).split(" ").pop();
  try {
    const tokenData = jwt.verify(rawToken, SECRET);
    const { id } = tokenData || {};
    req.user = await userModule.findOne({ _id: id });
    // 获取用户id
    next();
  } catch (err) {
    // 捕获token过期错误
    if (err.name === "TokenExpiredError") {
      res.send({
        message: "token已过期",
        returnCode: "000996",
      });
    }
    if (err.name === "JsonWebTokenError") {
      res.send({
        message: "无效token",
        returnCode: "000996",
      });
    }
  }
};

router.get("/query", auth, async (req, res) => {
  const { userName } = req.user || {};
  res.send({
    userName,
    message: "查询用户信息",
    returnCode: "000000",
  });
});

module.exports = router;
