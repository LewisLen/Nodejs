const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModule = require("../modules/users");

const router = express.Router();

// 秘钥
const SECRET = "kelly138**138kelly";

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/query", async (req, res) => {
  const users = await userModule.find({});
  res.send(users);
});

// 注册用户
router.post("/register", (req, res) => {
  const userInfo = userModule.create({
    userName: req.body.userName,
    passWord: req.body.passWord,
  });
  res.send(userInfo);
});

// 登录
// eslint-disable-next-line consistent-return
router.post("/login", (req, res) => {
  const userInfo = userModule.findOne({
    userName: req.body.userName,
  });
  if (!userInfo) {
    return res.status(423).send({
      message: "用户不存在",
    });
  }
  const isPassWordValid = bcrypt.compareSync(
    req.body.passWord,
    userInfo.passWord
  );
  if (!isPassWordValid) {
    return res.status(423).send({
      message: "密码不正确",
    });
  }
  const token = jwt.sign(
    {
      // eslint-disable-next-line no-underscore-dangle
      id: String(userInfo._id),
    },
    SECRET
  );
  res.send({
    userInfo,
    token,
  });
});

// 校验授权
const auth = async (req, res, next) => {
  // 获取客户端请求头的token
  const rawToken = String(req.headers.authorization).split(" ").pop();
  const tokenData = jwt.verify(rawToken, SECRET);
  //  console.log(tokenData)
  // 获取用户id
  const { id } = tokenData;
  req.user = await userModule.findById(id);
  next();
};

router.get("/api/profile", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
