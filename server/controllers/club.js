const {
  findOneClub,
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
const bcrypt = require("bcrypt");
const {
  bcrypt: { saltRounds },
} = require("../config");

module.exports = {
  getAllClubInfo: async (req, res) => {
    try {
      // 관리자 계정인지 확인
      const { club_id } = res.locals;
      const clubAccount = await findOneClub({ id: club_id });
      const { is_admin } = clubAccount.dataValues;
      if (!is_admin) {
        return res.status(403).json({ message: "not authorized" });
      }
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
      const { id, ...rest } = updated;
      await updateClubInfo({ id, ...rest });
      return res.status(200).json({ message: "club updated", updated: { club_id: id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  modifyClubPassword: async (req, res) => {
    try {
      // 클럽 비밀번호 확인
      const { id, password } = req.body;
      const clubAccount = await findOneClub({ id });
      const { is_admin, temp } = clubAccount.dataValues;
      if (temp || is_admin) {
        if (password.current !== clubAccount.dataValues.password)
          return res.status(401).json({ message: "유효하지 않은 비밀번호입니다" });
      }
      if (!temp && !is_admin) {
        const passwordValid = await bcrypt.compare(
          password.current,
          clubAccount.dataValues.password
        );
        if (!passwordValid)
          return res.status(401).json({ message: "유효하지 않은 비밀번호입니다" });
      }
      // 클럽 비밀번호 업데이트
      const hashed = await bcrypt.hash(password.new, saltRounds);
      await updateClubInfo({ id, password: hashed });
      return res.status(200).json({ message: "password updated", updated: { club_id: id } });
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
