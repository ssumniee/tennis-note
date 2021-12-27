import { NAV_DRAWER_ON, COMPONENT_OFF } from "../actions/actionTypes";

const initialState = {
  isNavDrawer: false,
};

const componentReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case NAV_DRAWER_ON:
      state = {
        ...prevState,
        isNavDrawer: true,
      };
      break;
    case COMPONENT_OFF:
      state = { ...initialState };
      break;
    default:
      state = { ...prevState };
      break;
  }
  return state;
};

export default componentReducer;
