import { combineReducers } from "redux";
import error from "./apiErrorReducer";
import loading from "./loadingReducer";
import problems from "./problemsReducer";
import userData from "./loginReducer";

import signupSuccess from "./singupReducer";

const rootReducer = combineReducers({
  problems,
  userData,
  signupSuccess,
  error,
  loading
});

export default rootReducer;
