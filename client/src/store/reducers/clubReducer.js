import { GET_ALL_USER_INFO } from "../actions/actionTypes";

const initialState = {
  users: [],
  teacherList: [],
  dayList: [],
};

const clubReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case GET_ALL_USER_INFO:
      state = {
        ...prevState,
        users: action.payload.users,
        teacherList: action.payload.teachers,
        dayList: action.payload.days,
      };
      break;
    default:
      state = { ...prevState };
      break;
  }
  return state;
};

export default clubReducer;
