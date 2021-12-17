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
        .json({ message: "club created", updated: { club_id: createdInfo.id } });
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
};
