import { GET_ALL_STUDENT_INFO } from "../actions/actionTypes";

const initialState = {
  students: [],
};

const studentReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case GET_ALL_STUDENT_INFO:
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

export default studentReducer;
