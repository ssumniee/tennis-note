const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares");
const {
  getAllClubInfo,
  modifyClubInfo,
  addClubInfo,
  deleteClubInfo,
  getOneClubId,
  checkClubUsernameUniqueness,
  modifyClubPassword,
  resetClubPassword,
  modifyTeacherInfo,
  addTeacherInfo,
  deleteTeacherInfo,
  modifyCourtInfo,
  addCourtInfo,
  deleteCourtInfo,
} = require("../controllers/club");

router.get("/", isAuth, getAllClubInfo);
router.put("/", isAuth, modifyClubInfo);
router.post("/", isAuth, addClubInfo);
router.delete("/", isAuth, deleteClubInfo);
router.post("/username", isAuth, checkClubUsernameUniqueness);
router.get("/id", getOneClubId);
router.put("/password", isAuth, modifyClubPassword);
router.post("/password", resetClubPassword);
router.put("/teacher", isAuth, modifyTeacherInfo);
router.post("/teacher", isAuth, addTeacherInfo);
router.delete("/teacher", isAuth, deleteTeacherInfo);
router.put("/court", isAuth, modifyCourtInfo);
router.post("/court", isAuth, addCourtInfo);
router.delete("/court", isAuth, deleteCourtInfo);

module.exports = router;
