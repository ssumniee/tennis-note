import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { componentOffAction, logoutAction } from "../store/actions";
import authApi from "../api/auth";
import { IoClose } from "react-icons/io5";

const NavDrawerContainer = styled.div`
  position: absolute;
  inset: 0 0 0 auto;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-white);
  padding: 2rem 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  flex: 0 0 1;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  padding: 0.25rem;
`;

const NavContainer = styled.div`
  margin: 4rem 0.5rem;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`;

const Nav = styled(NavLink)`
  overflow: visible auto;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 2.75rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  :last-of-type {
    margin-bottom: 0;
  }
  &.active {
    color: var(--color-blue);
    background-color: var(--color-paleblue);
  }
`;

const LogoutButton = styled.button`
  margin: 0.5rem;
  flex: 0 0 1;
  height: 2.75rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-blue);
  color: var(--color-blue);
  text-align: center;
  :active {
    background-color: var(--color-paleblue);
  }
`;

function NavDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, isTemp } = useSelector(({ authReducer }) => authReducer);

  const handleLogout = async () => {
    const res = await authApi.logout();
    if (res.status === 200) {
      dispatch(logoutAction);
      navigate("/", { replace: true });
    }
  };

  return (
    <NavDrawerContainer>
      <CloseButton
        onClick={() => {
          dispatch(componentOffAction);
        }}
      >
        <IoClose />
      </CloseButton>
      {!isAdmin && (
        <NavContainer className="desktop">
          {!isTemp && (
            <>
              <Nav to={"/student"}>
                회원
                <div className="underline"></div>
              </Nav>
              {/* <Nav to={"/schedule"}>
                시간표
                <div className="underline"></div>
              </Nav>
              <Nav to={"/sales"}>
                수강료
                <div className="underline"></div>
              </Nav> */}
            </>
          )}
          <Nav to={"/mypage"}>
            마이페이지
            <div className="underline"></div>
          </Nav>
        </NavContainer>
      )}
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </NavDrawerContainer>
  );
}

export default NavDrawer;
