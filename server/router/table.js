const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares");
const {
  getAllUserInfo,
  modifyUserInfo,
  addUserInfo,
  deleteUserInfo,
} = require("../controllers/table");

router.get("/:id", isAuth, getAllUserInfo);
router.put("/:id", isAuth, modifyUserInfo);
router.post("/:id", isAuth, addUserInfo);
router.delete("/:id", isAuth, deleteUserInfo);

module.exports = router;
