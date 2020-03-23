import { combineReducers } from "redux";
import problems from "./problemsReducer";
import userData from "./loginReducer";
import signupSuccess from "./singupReducer";
import apiCallsInProgress from "./apiStatusReducer";
import filters from "./filtersReducer";
const rootReducer = combineReducers({
  problems,
  userData,
  signupSuccess,
  apiCallsInProgress,
  filters
});

export default rootReducer;
