// TODO: 비밀번호 암호화하기
// const bcrypt = require("bcrypt");
// const {
//   bcrypt: { saltRounds },
// } = require("../config");
const { findOneClub } = require("./functions/sequelize");
const { DBERROR } = require("./functions/utility");
const { clearCookie, generateAccessToken, setCookie } = require("./functions/token");

module.exports = {
  login: async (req, res) => {
    try {
      const { name, password } = req.body;
      const clubAccount = await findOneClub({ name, password });
      if (!clubAccount) {
        return res.status(401).json({ message: "유효하지 않은 아이디 또는 비밀번호입니다" });
      }
      const token = generateAccessToken(clubAccount.dataValues.id);
      setCookie(res, token);
      const { id, tel } = clubAccount.dataValues;
      return res.status(200).json({ id, name, tel });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  logout: async (req, res) => {
    try {
      clearCookie(res);
      return res.status(200).json({ message: "로그아웃 되었습니다." });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  me: async (req, res) => {
    try {
      const { club_id } = res.locals;
      const clubInfo = await findOneClub({ id: club_id });
      const { id, name, tel } = clubInfo;
      return res.status(200).json({ id, name, tel });
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
