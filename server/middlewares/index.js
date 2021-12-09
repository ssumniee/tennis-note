const { verifyAccessToken, clearCookie } = require("../controllers/functions/token");
const { findOneClub } = require("../controllers/functions/sequelize");
const AUTH_ERROR = { message: "인증 오류" };

module.exports = {
  isAuth: async (req, res, next) => {
    const accessToken = req.cookies.jwt;
    if (!accessToken) {
      return res.status(403).json(AUTH_ERROR);
    }
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      clearCookie(res);
      return res.status(403).json(AUTH_ERROR);
    }
    const clubAccount = await findOneClub({ id: decoded.id });
    if (!clubAccount) {
      clearCookie(res);
      return res.status(403).json(AUTH_ERROR);
    }
    res.locals.club_id = clubAccount.dataValues.id;
    res.locals.token = accessToken;
    return next();
  },
};
