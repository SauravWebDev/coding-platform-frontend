import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

import * as problemApi from "../../api/problemsApi";

export function loadProblemsSuccess(problems) {
  return { type: types.LOAD_All_Problems_SUCCESS, problems };
}

export function getAllProblems() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return problemApi
      .getAllProblems()
      .then(problems => {
        dispatch(loadProblemsSuccess(problems));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
