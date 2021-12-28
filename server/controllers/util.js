const { createRandomString, createRandomNumber, sendMessage } = require("./functions/utility");
const { findStudentToRepayByClubId, updateStudentInfo } = require("./functions/sequelize");

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
      // SMS 전송
      sendMessage([{ tel: destNumber, text }]);
      return res.status(201).json({ message: "Verification SMS sent", verificationCode });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "Verification SMS not sent" });
    }
  },
  sendRepaymentSMS: async (clubInfo) => {
    try {
      const rawList = await findStudentToRepayByClubId(clubInfo.id);
      const toSendList = rawList.map((item) => ({
        tel: item.tel.split("-").join(""), // SMS를 수신할 전화번호
        text: `[${clubInfo.clubname}] ${item.name} 회원님의 레슨 결제주간입니다. 확인 부탁드립니다.`, // SMS 내용
      }));
      // SMS 전송
      sendMessage(toSendList);
      // repay SMS 전송 여부 갱신
      const sentList = [];
      rawList.forEach(async (item) => {
        await updateStudentInfo({ id: item.id, repayNotiSent: true });
        sentList.push({ id: item.id });
      });
      console.log({ message: "repay SMS sent", sent: sentList });
    } catch (err) {
      console.log(err);
    }
  },
};
