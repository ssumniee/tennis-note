const express = require("express");
const router = express.Router();
const { getAllUserInfo } = require("../controllers/club");

router.get("/:id", getAllUserInfo);

module.exports = router;
