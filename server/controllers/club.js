const {
  findAllClubInfo,
  updateClubInfo,
  createClubInfo,
  destroyClubInfo,
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
      // 유저 정보 수정
      const { updated } = req.body;
      await updateClubInfo(updated);
      const updatedAllClubInfo = await findAllClubInfo();
      return res.status(200).json({ ...updatedAllClubInfo });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  addClubInfo: async (req, res) => {
    try {
      // 유저 정보 생성
      const { name, is_admin, temp = !is_admin } = req.body;
      const password = createRandomString();
      await createClubInfo({ name, password, is_admin, temp });
      const updatedAllClubInfo = await findAllClubInfo();
      return res.status(200).json({ ...updatedAllClubInfo });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  deleteClubInfo: async (req, res) => {
    try {
      // 유저 정보 삭제
      const { id: club_id } = req.body;
      await destroyClubInfo(club_id);
      const updatedAllClubInfo = await findAllClubInfo();
      return res
        .status(200)
        .json({ message: "club deleted", deleted: { club_id }, ...updatedAllClubInfo });
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
