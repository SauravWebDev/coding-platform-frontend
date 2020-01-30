import { combineReducers } from "redux";
import problems from "./problemsReducer";
import userData from "./loginReducer";
import signupSuccess from "./singupReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  problems,
  userData,
  signupSuccess,
  apiCallsInProgress
});

export default rootReducer;
