import * as types from "./actionTypes";
import * as problemApi from "../../api/problemsApi";
import setLoading from "./loadingAction";
import setError from "./apiErrorAction";

export function setProblemsData(data) {
  let payload = {};
  for (let i = 0; i < data.length; i++) {
    payload[data[i].id] = data[i];
  }
  return { type: types.SET_ALL_PROBLEMS_DATA, payload };
}

export function getAllProblems() {
  return function(dispatch) {
    dispatch(setError(null));
    dispatch(setLoading(true));
    return problemApi
      .getAllProblems()
      .then(problems => {
        dispatch(setProblemsData(problems));
        dispatch(setLoading(false));
      })
      .catch(e => {
        console.log("Error in getAllProblems ", e);
        debugger;
        let err = new Error();
        err.msg = "Error in fetching all problems";
        dispatch(setError(err));
        dispatch(setLoading(false));
      });
  };
}
