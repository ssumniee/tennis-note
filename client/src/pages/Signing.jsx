import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import authApi from "../api/auth";
import { loginAction, logoutAction } from "../store/actions";
import TextInput from "../components/input/TextInput";
import PasswordInput from "../components/input/PasswordInput";
import ResetPwBtn from "../components/ResetPwBtn";

const SigningContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .input {
    ::placeholder {
      color: var(--color-gray);
    }
    border-radius: 0.5rem;
    :focus-within,
    :active,
    :hover {
      border-color: var(--color-blue);
    }
    ${(props) =>
      props.alert
        ? css`
            border-color: var(--color-red);
          `
        : css`
            border-color: var(--color-lightblue);
          `}
  }
  .reset-pw {
    margin: 0.5rem 0;
    font-size: 0.825rem;
    text-align: center;
    color: var(--color-blue);
    :hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.h1`
  margin: 1.5rem 0;
  text-align: center;
`;

const Form = styled.form`
  width: 16rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin: auto;
`;

const InputContainer = styled.div`
  height: 2.5rem;
  margin: 0.25rem 0;
  display: flex;
  justify-content: space-between;
`;

const LoginButton = styled.button`
  height: 2.5rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  background-color: var(--color-blue);
  color: var(--color-white);
  text-align: center;
  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
    color: var(--color-palegray);
  }
`;

const Alert = styled.div`
  margin: 0.5rem 0;
  color: var(--color-red);
  font-size: 0.8rem;
  text-align: center;
`;

const Signing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ name: "", password: "" });
  const [btnDisabled, setBtnDisabled] = useState(true);
  // const [alert, setAlert] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await authApi.login({ ...inputValue });
      if (res.status === 200) {
        dispatch(loginAction(res.data));
        const { is_admin: isAdmin, temp } = res.data;
        if (isAdmin) navigate("/admin", { replace: true });
        else if (temp) navigate("/mypage", { replace: true });
        else navigate("/student", { replace: true });
      }
    } catch (err) {
      setIsAlert(true);
      console.error(err);
    }
  };

  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const res = await authApi.me();
        if (res.status === 200) {
          dispatch(loginAction(res.data));
          const { is_admin: isAdmin, temp } = res.data;
          if (isAdmin) navigate("/admin", { replace: true });
          else if (temp) navigate("/mypage", { replace: true });
          else navigate("/student", { replace: true });
        }
      } catch (error) {
        // 토큰 만료의 경우 error.response.status가 403인 경우를 조건으로 -> 로그아웃 후 Signing으로 리디렉션
        // 다만, res.data가 제대로 넘어오지 않은 경우 등의 예외적인 에러에 대해서도 로그아웃 후 리디렉션 시키기 위해 조건문 생략
        dispatch(logoutAction);
        navigate("/", { replace: true });
      }
    };
    checkValidUser();
  }, []);

  useEffect(() => {
    setBtnDisabled(!inputValue.name || !inputValue.password);
    setIsAlert(false);
  }, [inputValue]);

  return (
    <SigningContainer alert={isAlert}>
      <Form onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <InputContainer className="input">
          <TextInput
            className="input"
            content="name"
            inputValue={inputValue.name}
            setInputValue={setInputValue}
            placeholder="아이디"
          />
        </InputContainer>
        <InputContainer className="input">
          <PasswordInput
            className="input"
            content="password"
            inputValue={inputValue.password}
            setInputValue={setInputValue}
            placeholder="비밀번호"
          />
        </InputContainer>
        {isAlert && <Alert>잘못된 아이디 또는 비밀번호입니다</Alert>}
        <LoginButton disabled={btnDisabled} type="submit">
          로그인
        </LoginButton>
        <ResetPwBtn className="reset-pw" />
      </Form>
    </SigningContainer>
  );
};

export default Signing;
