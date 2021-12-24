const { msg, config } = require("coolsms-node-sdk");
const { coolsms } = require("../../config");

module.exports = {
  DBERROR: (res, err) => {
    return res.status(500).json({ message: `DB 에러 발생: ${err}` });
  },
  createRandomString: () => {
    return Math.random().toString(36).slice(2);
  },
  createRandomNumber: (len = 6) => {
    return Math.random().toFixed(len).toString().slice(2);
  },
  sendMessage: async (telList, text) => {
    try {
      const { apiKey, apiSecret, callingNumber } = coolsms;
      config.init({
        apiKey: apiKey,
        apiSecret: apiSecret,
      });

      const msgRes = await msg.send({
        messages: telList.map((tel) => ({ to: tel, from: callingNumber, text })),
      });
      console.log(msgRes);
    } catch (err) {
      console.log(err);
    }
  },
};
