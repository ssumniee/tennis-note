import { NAV_MODAL_ON, RESET_PW_MODAL_ON, WINDOW_OFF } from "../actions/actionTypes";

const initialState = {
  isNavModal: false,
  isResetPwModal: false,
};

const windowReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case NAV_MODAL_ON:
      state = {
        ...prevState,
        isNavModal: true,
      };
      break;
    case RESET_PW_MODAL_ON:
      state = {
        ...prevState,
        isResetPwModal: true,
      };
      break;
    case WINDOW_OFF:
      state = { ...initialState };
      break;
    default:
      state = { ...prevState };
      break;
  }
  return state;
};

export default windowReducer;
