const { createRandomString } = require("./functions/utility");

module.exports = {
  getTempPassword: async (req, res) => {
    try {
      const tempPassword = createRandomString();
      return res.status(200).json({ tempPassword });
    } catch (err) {
      console.error(err);
    }
  },
};
