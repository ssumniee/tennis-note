import { LOG_IN, LOG_OUT } from "../actions/actionTypes";

const initialState = {
  isAdmin: false,
  isLogin: false,
  id: null,
  name: null,
  tel: null,
  days: [],
  teachers: [],
  courts: [],
};

const authReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case LOG_IN:
      state = {
        ...prevState,
        isAdmin: action.payload.is_admin,
        isLogin: true,
        ...action.payload.info,
      };
      break;
    case LOG_OUT:
      state = { ...initialState };
      break;
    default:
      state = { ...prevState };
      break;
  }
  return state;
};

export default authReducer;
