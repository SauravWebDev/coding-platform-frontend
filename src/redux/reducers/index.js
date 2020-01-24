import { combineReducers } from "redux";
import problems from "./problemsReducer";
import userData from "./loginReducer";
import signupSuccess from "./singupReducer";
import createUpdateProblems from "./singleProblemReducer";
const rootReducer = combineReducers({
  problems,
  userData,
  signupSuccess,
  createUpdateProblems
});

export default rootReducer;
