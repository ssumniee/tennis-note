const express = require("express");
const router = express.Router();
const { getTempPassword } = require("../controllers/util");

router.get("/password", getTempPassword);

module.exports = router;
