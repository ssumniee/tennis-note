import { LOG_IN, LOG_OUT } from "../actions/actionTypes";

const initialState = {
  isAdmin: false,
  isLogin: false,
  id: null,
  name: "",
  tel: "",
};

const authReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case LOG_IN:
      state = {
        ...prevState,
        isAdmin: action.payload.is_admin,
        isLogin: true,
        id: action.payload.id,
        name: action.payload.name,
        tel: action.payload.tel || "",
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
