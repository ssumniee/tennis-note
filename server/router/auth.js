const express = require("express");
const router = express.Router();
const { login, logout, me } = require("../controllers/auth");
const { isAuth } = require("../middlewares");

router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuth, me);

module.exports = router;
