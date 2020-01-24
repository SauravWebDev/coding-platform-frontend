import * as types from "./actionTypes";
import * as problemApi from "../../api/problemsApi";

export function problemLoadedSuccessfully(id, problem) {
  let data = { id, problem };
  return { type: types.LOAD_SINGLE_PROBLEM_SUCCESS, data };
}

export function getProblemByIdOrTitle(id) {
  return function(dispatch) {
    return problemApi
      .getProblemByIdOrTitle(id)
      .then(problem => {
        dispatch(problemLoadedSuccessfully(id, problem));
      })
      .catch(error => {
        throw error;
      });
  };
}
