import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";

const rootReducer = combineReducers({
  authReducer,
  studentReducer,
  // ...
});

export default rootReducer;
