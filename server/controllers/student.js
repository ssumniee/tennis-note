const {
  findAllStudentInfo,
  updateStudentInfo,
  createStudentInfo,
  destroyStudentInfo,
} = require("./functions/sequelize");
const { DBERROR } = require("./functions/utility");

module.exports = {
  getAllStudentInfo: async (req, res) => {
    try {
      const { club_id } = res.locals;
      const allStudentInfo = await findAllStudentInfo(club_id);
      return res.status(200).json({ students: allStudentInfo });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  modifyStudentInfo: async (req, res) => {
    try {
      // 유저 정보 수정
      const { updated } = req.body;
      await updateStudentInfo(updated);
      const { club_id } = res.locals;
      const updatedAllStudentInfo = await findAllStudentInfo(club_id);
      return res.status(200).json({ students: updatedAllStudentInfo });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  addStudentInfo: async (req, res) => {
    try {
      // 유저 정보 생성
      const { student, days } = req.body;
      await createStudentInfo({ student, days });
      const { club_id } = res.locals;
      const updatedAllStudentInfo = await findAllStudentInfo(club_id);
      return res.status(200).json({ students: updatedAllStudentInfo });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  deleteStudentInfo: async (req, res) => {
    try {
      // 유저 정보 삭제
      const { id: student_id } = req.body;
      await destroyStudentInfo(student_id);
      const { club_id } = res.locals;
      const updatedAllStudentInfo = await findAllStudentInfo(club_id);
      return res.status(200).json({
        message: "student deleted",
        deleted: { student_id },
        students: updatedAllStudentInfo,
      });
    } catch (err) {
      DBERROR(res, err);
    }
  },
};