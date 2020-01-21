import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import problems from "./problemsReducer";
import userData from "./loginReducer";
import signupSuccess from "./singupReducer";
const rootReducer = combineReducers({
  apiCallsInProgress,
  problems,
  userData,
  signupSuccess
});

export default rootReducer;
