import {
  LOG_IN,
  LOG_OUT,
  GET_ALL_STUDENT_INFO,
  GET_ALL_CLUB_INFO,
  NAV_DRAWER_ON,
  COMPONENT_OFF,
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

// Component: Drawer, Modal, ...
export const navDrawerOnAction = {
  type: NAV_DRAWER_ON,
};
export const componentOffAction = {
  type: COMPONENT_OFF,
};
