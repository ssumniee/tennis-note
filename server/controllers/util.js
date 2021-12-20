const { createRandomString, createRandomNumber } = require("./functions/utility");
const { sens } = require("../config");
const CryptoJS = require("crypto-js");
const axios = require("axios");

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
      const user_phone_number = tel.split("-").join(""); // SMS를 수신할 전화번호
      const verificationCode = createRandomNumber(6); // 인증 코드 (6자리 숫자)
      const date = Date.now().toString(); // 날짜 string

      // 환경 변수
      const sens_service_id = sens.serviceId;
      const sens_access_key = sens.accessKey;
      const sens_secret_key = sens.secretKey;
      const sens_call_number = sens.callNumber;

      // url 관련 변수 선언
      const method = "POST";
      const space = " ";
      const newLine = "\n";
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${sens_service_id}/messages`;
      const url2 = `/sms/v2/services/${sens_service_id}/messages`;

      // signature 작성 : crypto-js 모듈을 이용하여 암호화
      const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, sens_secret_key);
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(sens_access_key);
      const hash = hmac.finalize();
      const signature = hash.toString(CryptoJS.enc.Base64);

      // sens 서버로 요청 전송
      await axios({
        method: method,
        url: url,
        headers: {
          "Contenc-type": "application/json; charset=utf-8",
          "x-ncp-iam-access-key": sens_access_key,
          "x-ncp-apigw-timestamp": date,
          "x-ncp-apigw-signature-v2": signature,
        },
        data: {
          type: "SMS",
          countryCode: "82",
          from: sens_call_number,
          content: `[테니스노트] 본인확인 인증번호 [${verificationCode}]를 입력해주세요.`,
          messages: [{ to: `${user_phone_number}` }],
        },
      });
      return res.status(202).json({ message: "SMS sent", verificationCode });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "SMS not sent" });
    }
  },
};
