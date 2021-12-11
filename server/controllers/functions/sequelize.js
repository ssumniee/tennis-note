const { admin, club, user, teacher, day, user_day } = require("../../models");

module.exports = {
  findOneAdmin: async (queries, excludes = []) => {
    return await admin.findOne({
      where: { ...queries },
      attributes: { exclude: [...excludes] },
    });
  },
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
    return { user_id, ...user, days };
  },
  destroyUserInfo: async (user_id) => {
    // 유저 정보 삭제
    await user.destroy({ where: { id: user_id } });
    return { user_id };
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
  minusUserCounts: async (day_id) => {
    // 요일 아이디로 해당 요일에 수업이 있는 유저들 정보 구하기
    const usersData = await user_day.findAll({
      where: { day_id },
      attributes: [],
      include: [{ model: user, attributes: ["id", "count", "start_date"] }],
      raw: true,
    });
    // 수업 시작 날짜가 오늘 날짜보다 빠른 유저 정보만 필터링하기
    const today = new Date();
    const toUpdateData = usersData.filter((data) => new Date(data["user.start_date"]) < today);
    // 필터링된 유저 정보에서 수업 횟수를 1 차감하여 업데이트하기 (0인 경우는 그대로 두기)
    const updated = toUpdateData.map((data) => ({
      id: data["user.id"],
      count: data["user.count"] >= 1 ? data["user.count"] - 1 : 0,
    }));
    // updated 정보로 유저 정보 갱신
    await Promise.all(
      updated.map(async ({ id, count }) => {
        const targetUser = await user.findOne({ where: { id } });
        await targetUser.update({ count });
      })
    );
    return updated;
  },
};
