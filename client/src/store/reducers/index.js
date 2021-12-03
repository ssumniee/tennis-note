import { combineReducers } from "redux";
import authReducer from "./authReducer";
import clubReducer from "./clubReducer";

const rootReducer = combineReducers({
  authReducer,
  clubReducer,
  // ...
});

export default rootReducer;
