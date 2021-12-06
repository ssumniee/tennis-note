const {
  findAllUserInfo,
  updateUserInfo,
  findAllDayInfo,
  findAllTeacherInfo,
} = require("./functions/sequelize");
const { DBERROR } = require("./functions/utility");

module.exports = {
  getAllUserInfo: async (req, res) => {
    try {
      const { id: club_id } = req.params;
      const allUserInfo = await findAllUserInfo(club_id);
      const allTeacherInfo = await findAllTeacherInfo(club_id);
      const allDayInfo = await findAllDayInfo();
      return res
        .status(200)
        .json({ days: allDayInfo, teachers: allTeacherInfo, users: allUserInfo });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  modifyUserInfo: async (req, res) => {
    try {
      // 유저 정보 수정
      const { updated } = req.body;
      await updateUserInfo(updated);
      const { id: club_id } = req.params;
      const updatedAllUserInfo = await findAllUserInfo(club_id);
      return res.status(200).json({ users: updatedAllUserInfo });
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
