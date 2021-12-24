const { createRandomString, createRandomNumber, sendMessage } = require("./functions/utility");

module.exports = {
  getTempPassword: async (req, res) => {
    try {
      const tempPassword = createRandomString();
      return res.status(200).json({ tempPassword });
    } catch (err) {
      console.error(err);
    }
  },
  sendVerificationSMS: async (req, res) => {
    try {
      const { tel } = req.body;
      const destNumber = tel.split("-").join(""); // SMS를 수신할 전화번호
      const verificationCode = createRandomNumber(6); // 인증 코드 (6자리 숫자)
      const text = `[테니스노트] 인증번호 [${verificationCode}]를 입력해주세요.`;

      sendMessage([destNumber], text);

      return res.status(201).json({ message: "Verification SMS sent", verificationCode });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "Verification SMS not sent" });
    }
  },
};
