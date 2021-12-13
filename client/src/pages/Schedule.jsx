import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import media from "styled-media-query";
// import authApi from "../api/auth";
// import studentApi from "../api/student";
// import { getAllStudentInfoAction, loginAction, logoutAction } from "../store/actions";

const ScheduleContainer = styled.div`
  width: 100vw;
  height: 100%;
  padding: 2rem;
  ${media.lessThan("medium")`
    padding: 1rem;
  `}
`;

const Schedule = () => {
  return <ScheduleContainer></ScheduleContainer>;
};

export default Schedule;
