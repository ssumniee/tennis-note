import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";
import clubReducer from "./clubReducer";
import componentReducer from "./componentReducer";

const rootReducer = combineReducers({
  authReducer,
  studentReducer,
  clubReducer,
  componentReducer,
});

export default rootReducer;
