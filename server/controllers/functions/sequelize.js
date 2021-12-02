const { club } = require("../../models");

module.exports = {
  findOneClub: async (queries, excludes = []) => {
    return await club.findOne({
      where: { ...queries },
      attributes: { exclude: [...excludes] },
    });
  },
};
