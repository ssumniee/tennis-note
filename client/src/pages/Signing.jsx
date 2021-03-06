import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import authApi from "../api/auth";
import { loginAction, logoutAction, windowOffAction } from "../store/actions";
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
  const [inputValue, setInputValue] = useState({ username: "", password: "" });
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
        // ?????? ????????? ?????? error.response.status??? 403??? ????????? ???????????? -> ???????????? ??? Signing?????? ????????????
        // ??????, res.data??? ????????? ???????????? ?????? ?????? ?????? ???????????? ????????? ???????????? ???????????? ??? ???????????? ????????? ?????? ????????? ??????
        dispatch(logoutAction);
        navigate("/", { replace: true });
      }
    };
    checkValidUser();
  }, []);

  useEffect(() => {
    setBtnDisabled(!inputValue.username || !inputValue.password);
    setIsAlert(false);
  }, [inputValue]);

  useEffect(() => {
    dispatch(windowOffAction);
  }, []);

  return (
    <SigningContainer alert={isAlert}>
      <Form onSubmit={handleSubmit}>
        <Title>?????????</Title>
        <InputContainer className="input">
          <TextInput
            className="input"
            content="username"
            inputValue={inputValue.username}
            setInputValue={setInputValue}
            placeholder="?????????"
          />
        </InputContainer>
        <InputContainer className="input">
          <PasswordInput
            className="input"
            content="password"
            inputValue={inputValue.password}
            setInputValue={setInputValue}
            placeholder="????????????"
          />
        </InputContainer>
        {isAlert && <Alert>????????? ????????? ?????? ?????????????????????</Alert>}
        <LoginButton disabled={btnDisabled} type="submit">
          ?????????
        </LoginButton>
        <ResetPwBtn className="reset-pw" />
      </Form>
    </SigningContainer>
  );
};

export default Signing;
