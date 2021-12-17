import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";
import clubReducer from "./clubReducer";

const rootReducer = combineReducers({
  authReducer,
  studentReducer,
  clubReducer,
});

export default rootReducer;
