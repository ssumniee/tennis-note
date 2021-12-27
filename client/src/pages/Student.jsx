import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import media from "styled-media-query";
import authApi from "../api/auth";
import studentApi from "../api/student";
import {
  loginAction,
  logoutAction,
  getAllStudentInfoAction,
  componentOffAction,
} from "../store/actions";
import Table from "../components/table/Table";
import TitleArea from "../components/TitleArea";
import ExportBtn from "../components/table/ExportBtn";
import Sort from "../components/table/Sort";

const StudentContainer = styled.div`
  width: 100vw;
  height: 100%;
  padding: 2rem;
  ${media.lessThan("medium")`
    padding: 1rem;
    .top-bar {
      display: none;
    }
  `}
`;

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students: studentList } = useSelector(({ studentReducer }) => studentReducer);

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
        dispatch(logoutAction);
        navigate("/", { replace: true });
      }
    };
    checkValidUser();
  }, []);

  useEffect(() => {
    const getAndSetAllStudentInfo = async () => {
      try {
        const res = await studentApi.getAllStudentInfo();
        if (res.status === 200) {
          dispatch(getAllStudentInfoAction(res.data));
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAndSetAllStudentInfo();
  }, []);

  useEffect(() => {
    dispatch(componentOffAction);
  }, []);

  return (
    <StudentContainer>
      <TitleArea className="top-bar">
        <Sort subject="student" originList={studentList} />
        <ExportBtn subject="student" infoList={studentList} />
      </TitleArea>
      <Table subject="student" infoList={studentList} />
      <Table subject="student" isAdding />
    </StudentContainer>
  );
};

export default Student;
