import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tableReducer from "./tableReducer";

const rootReducer = combineReducers({
  authReducer,
  tableReducer,
  // ...
});

export default rootReducer;
