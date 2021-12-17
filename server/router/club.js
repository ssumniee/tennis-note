const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares");
const {
  getAllClubInfo,
  modifyClubInfo,
  addClubInfo,
  deleteClubInfo,
} = require("../controllers/club");

router.get("/", isAuth, getAllClubInfo);
router.put("/", isAuth, modifyClubInfo);
router.post("/", isAuth, addClubInfo);
router.delete("/", isAuth, deleteClubInfo);

module.exports = router;
