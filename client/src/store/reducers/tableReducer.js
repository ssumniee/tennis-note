import { GET_ALL_USER_INFO } from "../actions/actionTypes";

const initialState = {
  days: [],
  teachers: [],
  users: [],
};

const tableReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case GET_ALL_USER_INFO:
      state = {
        ...prevState,
        ...action.payload,
      };
      break;
    default:
      state = { ...prevState };
      break;
  }
  return state;
};

export default tableReducer;