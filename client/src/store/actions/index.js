import { LOG_IN, LOG_OUT, GET_ALL_STUDENT_INFO, GET_ALL_CLUB_INFO } from "./actionTypes";

// Auth
export const loginAction = (data) => ({
  type: LOG_IN,
  payload: { ...data },
});
export const logoutAction = {
  type: LOG_OUT,
};

// Student
export const getAllStudentInfoAction = (data) => ({
  type: GET_ALL_STUDENT_INFO,
  payload: { ...data },
});

// Club
export const getAllClubInfoAction = (data) => ({
  type: GET_ALL_CLUB_INFO,
  payload: { ...data },
});
