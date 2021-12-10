import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import styled from "styled-components";
import media from "styled-media-query";
import authApi from "../api/auth";
import tableApi from "../api/table";
import { getAllUserInfoAction, loginAction, logoutAction } from "../store/actions";
import Table from "../components/table/Table";
import AddForm from "../components/table/AddForm";

const HomeContainer = styled.div`
  width: 100vw;
  height: 100%;
  padding: 2rem;
  ${media.lessThan("medium")`
    padding: 1rem;
  `}
`;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: clubId } = useParams();
  const { users } = useSelector(({ tableReducer }) => tableReducer);

  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const res = await authApi.me();
        if (res.status === 200) {
          dispatch(loginAction(res.data));
        }
      } catch (error) {
        // 토큰 만료의 경우 error.response.status가 403인 경우를 조건으로 -> 로그아웃 후 Signing으로 리디렉션
        // 다만, res.data가 제대로 넘어오지 않은 경우 등의 예외적인 에러에 대해서도 로그아웃 후 리디렉션 시키기 위해 조건문 생략
        if (error.response.status === 403) {
          dispatch(logoutAction);
          navigate("/", { replace: true });
        }
      }
    };
    checkValidUser();
  }, []);

  useEffect(() => {
    const getAndSetAllUserInfo = async () => {
      try {
        const res = await tableApi.getAllUserInfo(clubId);
        if (res.status === 200) {
          dispatch(getAllUserInfoAction(res.data));
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAndSetAllUserInfo();
  }, []);

  return (
    <HomeContainer>
      <Table users={users} />
      <AddForm />
    </HomeContainer>
  );
};

export default Home;
