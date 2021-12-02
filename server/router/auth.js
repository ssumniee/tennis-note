const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/auth");
// TODO: isAuth 미들웨어로 세팅하기
// const { isAuth } = require("../middlewares");

router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
