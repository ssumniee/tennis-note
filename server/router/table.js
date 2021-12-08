const express = require("express");
const router = express.Router();
// const { isAuth } = require("../middlewares");
const { getAllUserInfo, modifyUserInfo, addUserInfo } = require("../controllers/table");

router.get("/:id", /* isAuth, */ getAllUserInfo);
router.put("/:id", /* isAuth, */ modifyUserInfo);
router.post("/:id", /* isAuth, */ addUserInfo);

module.exports = router;
