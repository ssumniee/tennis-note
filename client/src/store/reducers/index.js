import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";
import clubReducer from "./clubReducer";
import windowReducer from "./windowReducer";

const rootReducer = combineReducers({
  authReducer,
  studentReducer,
  clubReducer,
  windowReducer,
});

export default rootReducer;
