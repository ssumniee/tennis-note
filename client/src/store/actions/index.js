import {
  LOG_IN,
  LOG_OUT,
  GET_ALL_STUDENT_INFO,
  GET_ALL_CLUB_INFO,
  NAV_MODAL_ON,
  RESET_PW_MODAL_ON,
  WINDOW_OFF,
} from "./actionTypes";

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

// Window
export const navModalOnAction = {
  type: NAV_MODAL_ON,
};
export const resetPwModalOnAction = {
  type: RESET_PW_MODAL_ON,
};
export const windowOffAction = {
  type: WINDOW_OFF,
};
