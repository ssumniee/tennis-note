import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import media from "styled-media-query";
import authApi from "../api/auth";
import { logoutAction } from "../store/actions";

const HeaderContainer = styled.header`
  position: sticky;
  inset: 0 0 0 auto;
  height: 4rem;
  z-index: 10;
  padding: 1rem 2rem;
  ${media.lessThan("medium")`
    padding: 1rem;
  `}
  background-color: var(--color-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-lightgray);
`;

const Logo = styled.div`
  flex: 0 0 1;
  width: max-content;
  font-size: 1.5rem;
`;

const LogoutButton = styled.button`
  flex: 0 0 1;
  width: max-content;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-blue);
  color: var(--color-blue);
  text-align: center;
  :hover {
    background-color: var(--color-paleblue);
  }
`;

const NavContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 2rem;
  position: relative;
`;

const Nav = styled(NavLink)`
  overflow: auto visible;
  padding: 0 0.75rem;
  width: max-content;
  height: 100%;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  :last-of-type {
    margin-right: 0;
  }
  .underline {
    display: none;
    position: absolute;
    bottom: -1rem;
    width: 2.5rem;
    height: 0.125rem;
    background-color: var(--color-blue);
  }
  :hover {
    color: var(--color-blue);
  }
  &.active {
    color: var(--color-blue);
    .underline {
      display: block;
    }
  }
`;

const Header = () => {
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
    <HeaderContainer>
      <Logo>테니스노트</Logo>
      {!isAdmin && (
        <NavContainer>
          {!isTemp && (
            <>
              <Nav to={"/student"}>
                회원
                <div className="underline"></div>
              </Nav>
              <Nav to={"/schedule"}>
                시간표
                <div className="underline"></div>
              </Nav>
              <Nav to={"/sales"}>
                수강료
                <div className="underline"></div>
              </Nav>
            </>
          )}
          <Nav to={"/mypage"}>
            마이페이지
            <div className="underline"></div>
          </Nav>
        </NavContainer>
      )}
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
