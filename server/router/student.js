const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares");
const {
  getAllStudentInfo,
  modifyStudentInfo,
  addStudentInfo,
  deleteStudentInfo,
} = require("../controllers/student");

router.get("/", isAuth, getAllStudentInfo);
router.put("/", isAuth, modifyStudentInfo);
router.post("/", isAuth, addStudentInfo);
router.delete("/", isAuth, deleteStudentInfo);

module.exports = router;
