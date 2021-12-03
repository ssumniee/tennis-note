import { LOG_IN, LOG_OUT, GET_ALL_USER_INFO } from "./actionTypes";

// Auth
export const loginAction = (data) => ({
  type: LOG_IN,
  payload: { ...data },
});
export const logoutAction = {
  type: LOG_OUT,
};

// Club
export const getAllUserInfoAction = (users) => ({
  type: GET_ALL_USER_INFO,
  payload: { users },
});
