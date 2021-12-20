import React, { useState } from "react";
import { useParams } from "react-router-dom";
import clubApi from "../api/club";
import utilApi from "../api/util";
import TextInput from "../components/input/TextInput";
import PasswordInput from "../components/input/PasswordInput";

const PasswordReset = () => {
  const { id: clubId } = useParams();
  const [inputValue, setInputValue] = useState({ tel: "", code: "", newPw: "" });
  const [verificationCode, setVerificationCode] = useState("");
  const [pwResetAvailable, setPwResetAvailable] = useState(false);

  const sendVerificationMessage = async () => {
    try {
      const resCode = await utilApi.getVerificationCode(inputValue.tel);
      setVerificationCode(resCode);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmVerificationCode = async () => {
    try {
      if (verificationCode === inputValue.code) {
        setPwResetAvailable(true);
      } else {
        setPwResetAvailable(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await clubApi.resetClubPassword({ id: clubId, password: inputValue.newPw });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!pwResetAvailable ? (
        <>
          <div>
            <TextInput
              className="tel"
              content="tel"
              inputValue={inputValue.tel}
              setInputValue={setInputValue}
              placeholder="전화번호"
            />
            <button onClick={sendVerificationMessage}>인증번호 전송</button>
          </div>
          <div>
            <TextInput
              className="code"
              content="code"
              inputValue={inputValue.code}
              setInputValue={setInputValue}
              placeholder="인증번호"
            />
            <button onClick={confirmVerificationCode}>확인</button>
          </div>
        </>
      ) : (
        <>
          <PasswordInput
            className="new-pw"
            content="newPw"
            inputValue={inputValue.newPw}
            setInputValue={setInputValue}
            placeholder="새로운 비밀번호"
          />
          <button onClick={handlePasswordChange}>비밀번호 변경</button>
        </>
      )}
    </>
  );
};

export default PasswordReset;
