const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModule = require("../modules/users");

const router = express.Router();

// 秘钥
const SECRET = "kelly138**138kelly";

// 注册用户
router.post("/register", (req, res) => {
  const userInfo = userModule.create({
    userName: req.body.userName,
    passWord: req.body.passWord,
  });
  res.send(userInfo);
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
      // 有效时间
      { expiresIn: "120ms" }
    );
    res.send({
      message: "登录成功",
      returnCode: "000000",
      userName,
      token,
    });
  });
});

// 校验授权
const auth = async (req, res, next) => {
  // 获取客户端请求头的token
  const rawToken = String(req.headers.authorization).split(" ").pop();
  const tokenData = jwt.verify(rawToken, SECRET);
  // 获取用户id
  const { id } = tokenData;
  req.user = await userModule.findById(id);
  next();
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
