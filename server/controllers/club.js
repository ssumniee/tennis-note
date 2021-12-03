const { findAllUserInfo } = require("./functions/sequelize");
const { DBERROR } = require("./functions/utility");

module.exports = {
  getAllUserInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const allUserInfo = await findAllUserInfo(id);
      return res.status(200).json(allUserInfo);
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
