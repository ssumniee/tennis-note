const { club } = require("../../models");
const { user } = require("../../models");
const { teacher } = require("../../models");
const { day } = require("../../models");
const { user_day } = require("../../models");

module.exports = {
  findOneClub: async (queries, excludes = []) => {
    return await club.findOne({
      where: { ...queries },
      attributes: { exclude: [...excludes] },
    });
  },
  findAllUserInfo: async (club_id) => {
    // club_id로 필요한 유저 정보와 선생님 이름 가져오기
    const raw = await user.findAll({
      where: { club_id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "club_id", "teacher_id"],
      },
      include: [
        {
          model: teacher,
          attributes: ["name"],
        },
      ],
      raw: true,
    });
    // raw 데이터 가공
    const refined = await Promise.all(
      raw.map(async (user) => {
        // user_id로 수업이 있는 요일 이름들 받아오기
        const dayNames = await user_day.findAll({
          where: { user_id: user.id },
          attributes: [],
          include: [
            {
              model: day,
              attributes: ["name"],
            },
          ],
          order: ["day_id"],
          raw: true,
        });
        const dayNamesArr = dayNames.map((el) => el["day.name"]);
        // 프로퍼티 이름 가공하여 리턴
        return {
          ...user,
          "teacher.name": undefined,
          teacher_name: user["teacher.name"],
          days: dayNamesArr,
        };
      })
    );
    return refined;
  },
};
