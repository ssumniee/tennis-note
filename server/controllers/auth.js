const {
  findOneClub,
  findAllTeacherInfo,
  findAllDayInfo,
  findAllCourtInfo,
} = require("./functions/sequelize");
const { DBERROR } = require("./functions/utility");
const { clearCookie, generateAccessToken, setCookie } = require("./functions/token");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const clubAccount = await findOneClub({ username });
      if (!clubAccount) {
        return res.status(401).json({ message: "유효하지 않은 아이디 또는 비밀번호입니다" });
      }
      const { is_admin, temp, id, tel } = clubAccount.dataValues;
      if (temp || is_admin) {
        if (password !== clubAccount.dataValues.password)
          return res.status(401).json({ message: "유효하지 않은 아이디 또는 비밀번호입니다" });
      }
      if (!temp && !is_admin) {
        const passwordValid = await bcrypt.compare(password, clubAccount.dataValues.password);
        if (!passwordValid)
          return res.status(401).json({ message: "유효하지 않은 아이디 또는 비밀번호입니다" });
      }
      const info = { id, username, tel };
      if (!is_admin) {
        info.days = await findAllDayInfo(id);
        info.teachers = await findAllTeacherInfo(id);
        info.courts = await findAllCourtInfo(id);
      }
      const token = generateAccessToken(id);
      setCookie(res, token);
      return res.status(200).json({ is_admin, temp, info });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  logout: async (req, res) => {
    try {
      clearCookie(res);
      return res.status(200).json({ message: "로그아웃 되었습니다" });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  me: async (req, res) => {
    try {
      const { club_id } = res.locals;
      const clubInfo = await findOneClub({ id: club_id });
      const { is_admin, temp, id, username, clubname, tel } = clubInfo.dataValues;
      const info = { id, username, clubname, tel };
      if (!is_admin) {
        info.days = await findAllDayInfo(id);
        info.teachers = await findAllTeacherInfo(id);
        info.courts = await findAllCourtInfo(id);
      }
      return res.status(200).json({ is_admin, temp, info });
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
