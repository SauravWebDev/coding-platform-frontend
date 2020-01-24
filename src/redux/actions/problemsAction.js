import * as types from "./actionTypes";
import * as problemApi from "../../api/problemsApi";

export function setProblemsData(payload) {
  return { type: types.SET_ALL_PROBLEMS_DATA, payload };
}

export function setLoading(payload) {
  return { type: types.IS_ALL_PROBLEM_LOADED_SUCCESSFULLY, payload };
}

export function setError(payload) {
  return { type: types.SET_PROBLEMS_ERROR, payload };
}

export function getAllProblems() {
  return function(dispatch) {
    dispatch(setLoading(true));
    return problemApi
      .getAllProblems()
      .then(problems => {
        dispatch(setProblemsData(problems));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setError("Error in fetching all problems"));
        dispatch(setLoading(false));
      });
  };
}
