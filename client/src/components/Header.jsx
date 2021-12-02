import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authApi from "../api/auth";
import { logoutAction } from "../store/actions";

const HeaderContainer = styled.header`
  position: sticky;
  inset: 0 0 0 auto;
  height: 4rem;
  z-index: 10;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-lightgray);
`;

const Logo = styled.div`
  font-size: 1.5rem;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-blue);
  color: var(--color-white);
  text-align: center;
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await authApi.logout();
    if (res.status === 200) {
      dispatch(logoutAction);
      navigate("/", { replace: true });
    }
  };

  return (
    <HeaderContainer>
      <Logo>테니스노트</Logo>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
