import { GET_ALL_CLUB_INFO } from "../actions/actionTypes";

const initialState = {
  admins: [],
  temps: [],
  clubs: [],
};

const clubReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case GET_ALL_CLUB_INFO:
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

export default clubReducer;
