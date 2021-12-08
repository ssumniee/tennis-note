const { club } = require("../../models");
const { user } = require("../../models");
const { teacher } = require("../../models");
const { user_day } = require("../../models");
const { day } = require("../../models");

module.exports = {
  findOneClub: async (queries, excludes = []) => {
    return await club.findOne({
      where: { ...queries },
      attributes: { exclude: [...excludes] },
    });
  },
  findAllUserInfo: async (club_id) => {
    // club_id로 필요한 유저 정보 가져오기
    const raw = await user.findAll({
      where: { club_id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    // 유저 정보 가공: 요일 정보 합치기
    const refined = await Promise.all(
      raw.map(async (user) => {
        // user_id로 수업이 있는 요일 정보 받아오기
        const targetDays = await user_day.findAll({
          where: { user_id: user.id },
          attributes: ["day_id"],
          order: ["day_id"],
        });
        const days = targetDays.map((el) => el.day_id);
        return { ...user.dataValues, days };
      })
    );
    return refined;
  },
  updateUserInfo: async (updated) => {
    // 변경된 유저 정보
    const { id: user_id, name, tel, start_date, teacher_id, days, count } = updated;
    // 유저 정보 갱신
    await user.update(
      { name, tel, start_date, teacher_id, count },
      {
        where: {
          id: user_id,
        },
      }
    );
    // 기존 수업 요일 id값들
    const prevDaysData = await user_day.findAll({
      where: { user_id },
      attributes: ["day_id"],
      order: ["day_id"],
    });
    const prevDays = prevDaysData.map((data) => data.day_id);
    // updated에 따른 수업 요일 id값들 받아오기
    const updatedDays = [...days];
    // 새로 추가된 수업 요일 id값들
    const toCreate = updatedDays.filter((id) => !prevDays.includes(id));
    // 수업이 없어진 요일 id값들
    const toDestroy = prevDays.filter((id) => !updatedDays.includes(id));
    // 새로 추가된 수업 요일 정보 user_day 테이블에 생성
    await Promise.all(toCreate.map(async (id) => await user_day.create({ user_id, day_id: id })));
    // 수업이 없어진 요일 정보 user_day 테이블에서 삭제
    await Promise.all(
      toDestroy.map(async (id) => await user_day.destroy({ where: { day_id: id } }))
    );
    return { ...updated };
  },
  createUserInfo: async ({ user: user_info, days }) => {
    // 유저 정보 생성
    const created = await user.create({ ...user_info });
    const { id: user_id } = created.dataValues;
    // 수업 요일 id값들에 따라 수업 요일 정보 user_day 테이블에 생성
    await Promise.all(days.map(async (id) => await user_day.create({ user_id, day_id: id })));
    console.log("created", created.dataValues);
    return { user_id, ...user, days };
  },
  findAllTeacherInfo: async (club_id) => {
    const teachersData = await teacher.findAll({
      where: { club_id },
      attributes: ["id", "name"],
    });
    return teachersData.map((data) => data.dataValues);
  },
  findAllDayInfo: async () => {
    const daysData = await day.findAll({
      attributes: ["id", "name"],
    });
    return daysData.map((data) => data.dataValues);
  },
};
