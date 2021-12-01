import { LOG_IN, LOG_OUT } from "../actions/actionTypes";

const initialState = {
  isLogin: false,
  id: "",
  name: "",
  tel: "",
};

const authReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case LOG_IN:
      state = {
        ...prevState,
        isLogin: true,
        ...action.payload,
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
