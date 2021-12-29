import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import clubApi from "../api/club";
import utilApi from "../api/util";
import TextInput from "../components/input/TextInput";
import PasswordInput from "../components/input/PasswordInput";

const ResetPwContainer = styled.div`
  margin: auto;
  flex: 1 1 0;
  padding: 2rem 0 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0 0 2rem;
  font-size: 1.25rem;
  font-family: Interop-Medium;
  font-weight: normal;
  text-align: center;
`;

const InputArea = styled.div`
  width: 20rem;
  height: 2.25rem;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin: 0.5rem 0;
  > * {
    margin-right: 0.5rem;
    :last-child {
      margin-right: 0;
    }
  }
  ${(props) =>
    props.warn &&
    css`
      .input {
        border-color: var(--color-red);
      }
    `}
`;

const IndexContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 3.5rem;
  margin-right: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-gray);
`;

const InputContainer = styled.div`
  flex: 1 1 0;
  position: relative;
`;

const NotiContainer = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.925rem;
  color: var(--color-blue);
  > * {
    margin: 0.5rem 0;
    text-align: center;
  }
  #not-match {
    font-size: 0.875rem;
    color: var(--color-red);
    margin: 0;
  }
  .expired {
    color: var(--color-red);
  }
  #not-found,
  #result {
    flex: 1 1 0;
    font-size: 1rem;
    color: var(--color-darkgray);
    margin: 0.5rem 0 2rem;
  }
`;

const Button = styled.button`
  text-align: center;
  border-radius: 0.25rem;
  font-size: 0.925rem;
  padding: 0 0.5rem;
  min-width: 4.5rem;
  height: 2.25rem;
  :hover {
    opacity: 0.8;
  }
  :disabled {
    opacity: 0.4;
  }
  &#send-code {
    margin-left: 5rem;
    padding: 0 1rem;
  }
  &#send-code,
  &#confirm-code,
  &#reset-pw,
  &.close {
    background-color: var(--color-blue);
    color: var(--color-white);
  }
  &#resend-code {
    min-width: max-content;
    font-size: 0.875rem;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray);
    :hover {
      opacity: unset;
      text-decoration: underline;
      color: var(--color-darkgray);
    }
  }
`;

const ResetPwInner = () => {
  const [step, setStep] = useState("insert-info"); // insert-info > code-sent > verification-completed > process-completed
  const [inputValue, setInputValue] = useState({ username: "", tel: "", code: "", newPw: "" });
  const [clubId, setClubId] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const [codeValidTime, setCodeValidTime] = useState(180000);
  const [codeMatch, setCodeMatch] = useState("unchecked"); // unchekced, not-match, match
  const [pwResetAvailable, setPwResetAvailable] = useState(false);
  const [pwUpdated, setPwUpdated] = useState(false);

  const sendVerificationMessage = async () => {
    try {
      // 이름으로 계정 id 받아오기
      const resId = await clubApi.getOneClubIdByUsername(inputValue.username);
      setClubId(resId);
      const resCode = await utilApi.getVerificationCode(inputValue.tel);
      setVerificationCode(resCode);
      setCodeValidTime(180000);
      setStep("code-sent");
    } catch (err) {
      console.error(err);
    }
  };

  const confirmVerificationCode = async () => {
    try {
      if (verificationCode === inputValue.code && codeValidTime > 0) {
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

  useEffect(() => {
    setCodeMatch("unchecked");
  }, [inputValue.code]);

  useEffect(() => {
    let timer;
    if (verificationCode) {
      clearInterval(timer);
      timer = setInterval(() => {
        setCodeValidTime((prevState) => prevState - 1000);
      }, 1000);
    }
    if (codeValidTime <= 0) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [verificationCode, codeValidTime]);

  return (
    <ResetPwContainer>
      <Title>비밀번호 재설정</Title>
      {step === "insert-info" && (
        <>
          <InputArea>
            <IndexContainer>아이디</IndexContainer>
            <InputContainer>
              <TextInput
                className="input"
                content="username"
                inputValue={inputValue.username}
                setInputValue={setInputValue}
                placeholder="아이디"
              />
            </InputContainer>
          </InputArea>
          <InputArea>
            <IndexContainer>전화번호</IndexContainer>
            <InputContainer>
              <TextInput
                className="input"
                content="tel"
                inputValue={inputValue.tel}
                setInputValue={setInputValue}
                placeholder="전화번호"
              />
            </InputContainer>
          </InputArea>
          <InputArea>
            <Button
              id="send-code"
              disabled={!inputValue.username || !inputValue.tel}
              onClick={sendVerificationMessage}
            >
              인증번호 전송
            </Button>
          </InputArea>
        </>
      )}

      {step === "code-sent" && (
        <>
          {verificationCode && (
            <NotiContainer>
              {codeValidTime > 0 ? (
                <>
                  <span>인증번호가 전송되었습니다.</span>
                  <span>
                    남은 시간{" "}
                    {`${Math.floor(codeValidTime / 1000 / 60)}:${
                      (codeValidTime / 1000) % 60 < 10
                        ? "0" + ((codeValidTime / 1000) % 60)
                        : (codeValidTime / 1000) % 60
                    }`}
                  </span>
                </>
              ) : (
                <>
                  <span className="expired">인증번호를 다시 전송해주세요.</span>
                  <span className="expired">시간 초과</span>
                </>
              )}
            </NotiContainer>
          )}
          <InputArea warn={codeValidTime <= 0 || codeMatch === "not-match"}>
            <InputContainer>
              <TextInput
                className="input"
                content="code"
                inputValue={inputValue.code}
                setInputValue={setInputValue}
                placeholder="인증번호"
              />
              <Button id="resend-code" onClick={sendVerificationMessage}>
                재전송
              </Button>
            </InputContainer>
            <Button id="confirm-code" disabled={!inputValue.code} onClick={confirmVerificationCode}>
              확인
            </Button>
          </InputArea>
          {codeValidTime > 0 && codeMatch === "not-match" && (
            <NotiContainer>
              <span id="not-match">인증번호가 일치하지 않습니다.</span>
            </NotiContainer>
          )}
        </>
      )}

      {step === "verification-completed" &&
        (clubId && pwResetAvailable ? (
          <>
            <InputArea>
              <InputContainer>
                <PasswordInput
                  className="input"
                  content="newPw"
                  inputValue={inputValue.newPw}
                  setInputValue={setInputValue}
                  placeholder="새로운 비밀번호"
                />
              </InputContainer>
              <Button id="reset-pw" disabled={!inputValue.newPw} onClick={handlePasswordChange}>
                변경하기
              </Button>
            </InputArea>
          </>
        ) : (
          <>
            <NotiContainer>
              <span id="not-found">사용자를 찾을 수 없습니다.</span>
            </NotiContainer>
            <Button
              className="close"
              onClick={() => {
                window.close();
              }}
            >
              닫기
            </Button>
          </>
        ))}

      {step === "process-completed" && (
        <>
          <NotiContainer>
            <span id="result">
              {pwUpdated ? "비밀번호가 변경되었습니다." : "비밀번호를 변경할 수 없습니다."}
            </span>
          </NotiContainer>
          <Button
            className="close"
            onClick={() => {
              window.close();
            }}
          >
            {pwUpdated ? "확인" : "닫기"}
          </Button>
        </>
      )}
    </ResetPwContainer>
  );
};

export default ResetPwInner;
