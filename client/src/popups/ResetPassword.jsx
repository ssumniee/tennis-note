import React, { useState } from "react";
import clubApi from "../api/club";
import utilApi from "../api/util";
import TextInput from "../components/input/TextInput";
import PasswordInput from "../components/input/PasswordInput";

const PasswordReset = () => {
  const [step, setStep] = useState("insert-info"); // insert-info > code-sent > verification-completed > process-completed
  const [inputValue, setInputValue] = useState({ name: "", tel: "", code: "", newPw: "" });
  const [clubId, setClubId] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeMatch, setCodeMatch] = useState("unchecked"); // unchekced, not-match, match
  const [pwResetAvailable, setPwResetAvailable] = useState(false);
  const [pwUpdated, setPwUpdated] = useState(false);

  const sendVerificationMessage = async () => {
    try {
      // 이름으로 계정 id 받아오기
      const resId = await clubApi.getOneClubId({ name: inputValue.name });
      setClubId(resId);
      console.log("clubId", clubId);
      const resCode = await utilApi.getVerificationCode(inputValue.tel);
      setVerificationCode(resCode);
      console.log("resCode", resCode);
      setStep("code-sent");
    } catch (err) {
      console.error(err);
    }
  };

  const confirmVerificationCode = async () => {
    try {
      if (verificationCode === inputValue.code) {
        setCodeMatch("match");
        setPwResetAvailable(true);
        setStep("verification-completed");
      } else {
        setCodeMatch("not-match");
        setPwResetAvailable(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await clubApi.resetClubPassword({ id: clubId, password: inputValue.newPw });
      setPwUpdated(true);
      setStep("process-completed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {step === ("insert-info" || "code-sent") && (
        <>
          <TextInput
            className="name"
            content="name"
            inputValue={inputValue.name}
            setInputValue={setInputValue}
            placeholder="아이디"
          />
          <TextInput
            className="tel"
            content="tel"
            inputValue={inputValue.tel}
            setInputValue={setInputValue}
            placeholder="전화번호"
          />
          <button onClick={sendVerificationMessage}>인증번호 전송</button>
        </>
      )}

      {step === "code-sent" && (
        <>
          <span>{verificationCode && "인증번호가 전송되었습니다."}</span>
          <span>남은 시간 {`${"3"}:${"00"}`}</span>
          <TextInput
            className="code"
            content="code"
            inputValue={inputValue.code}
            setInputValue={setInputValue}
            placeholder="인증번호"
          />
          <button onClick={confirmVerificationCode}>확인</button>
          {codeMatch === "not-match" && <span>인증번호가 일치하지 않습니다.</span>}
        </>
      )}

      {step === "verification-completed" && (
        <>
          {clubId && pwResetAvailable ? (
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
          ) : (
            <span>사용자를 찾을 수 없습니다.</span>
          )}
        </>
      )}

      {step === "process-completed" && (
        <>
          <span>{pwUpdated ? "비밀번호가 변경되었습니다." : "비밀번호를 변경할 수 없습니다."}</span>
          <button
            onClick={() => {
              window.close();
            }}
          >
            닫기
          </button>
        </>
      )}
    </>
  );
};

export default PasswordReset;
