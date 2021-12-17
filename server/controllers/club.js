const {
  findAllClubInfo,
  updateClubInfo,
  createClubInfo,
  destroyClubInfo,
  updateTeacherInfo,
  createTeacherInfo,
  destroyTeacherInfo,
  updateCourtInfo,
  createCourtInfo,
  destroyCourtInfo,
} = require("./functions/sequelize");
const { createRandomString } = require("./functions/utility");
const { DBERROR } = require("./functions/utility");

module.exports = {
  getAllClubInfo: async (req, res) => {
    try {
      const { admins, temps, clubs } = await findAllClubInfo();
      return res.status(200).json({ admins, temps, clubs });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  modifyClubInfo: async (req, res) => {
    try {
      // 클럽 정보 수정
      const { updated } = req.body;
      const updatedInfo = await updateClubInfo(updated);
      return res
        .status(200)
        .json({ message: "club updated", updated: { club_id: updatedInfo.id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  addClubInfo: async (req, res) => {
    try {
      // 클럽 정보 생성
      const { name, is_admin, temp = !is_admin } = req.body;
      const password = createRandomString();
      const createdInfo = await createClubInfo({ name, password, is_admin, temp });
      return res
        .status(200)
        .json({ message: "club created", created: { club_id: createdInfo.id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  deleteClubInfo: async (req, res) => {
    try {
      // 클럽 정보 삭제
      const { id: club_id } = req.body;
      await destroyClubInfo(club_id);
      return res.status(200).json({ message: "club deleted", deleted: { club_id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  modifyTeacherInfo: async (req, res) => {
    try {
      // 강사 정보 수정
      const { updated } = req.body;
      const updatedInfo = await updateTeacherInfo(updated);
      return res
        .status(200)
        .json({ message: "teacher updated", updated: { teacher_id: updatedInfo.id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  addTeacherInfo: async (req, res) => {
    try {
      // 강사 정보 생성
      const { name, club_id, court_id } = req.body;
      const createdInfo = await createTeacherInfo({ name, club_id, court_id });
      return res
        .status(200)
        .json({ message: "teacher created", created: { teacher_id: createdInfo.id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  deleteTeacherInfo: async (req, res) => {
    try {
      // 강사 정보 삭제
      const { id: teacher_id } = req.body;
      await destroyTeacherInfo(teacher_id);
      return res.status(200).json({ message: "teacher deleted", deleted: { teacher_id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  modifyCourtInfo: async (req, res) => {
    try {
      // 코트 정보 수정
      const { updated } = req.body;
      const updatedInfo = await updateCourtInfo(updated);
      return res
        .status(200)
        .json({ message: "court updated", updated: { court_id: updatedInfo.id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  addCourtInfo: async (req, res) => {
    try {
      // 코트 정보 생성
      const { name, club_id } = req.body;
      const createdInfo = await createCourtInfo({ name, club_id });
      return res
        .status(200)
        .json({ message: "court created", created: { court_id: createdInfo.id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  deleteCourtInfo: async (req, res) => {
    try {
      // 코트 정보 삭제
      const { id: court_id } = req.body;
      await destroyCourtInfo(court_id);
      return res.status(200).json({ message: "court deleted", deleted: { court_id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
