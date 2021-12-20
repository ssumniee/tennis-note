const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares");
const { getTempPassword, sendVerificationSMS } = require("../controllers/util");

router.get("/password", isAuth, getTempPassword);
router.post("/message/code", isAuth, sendVerificationSMS);

module.exports = router;
