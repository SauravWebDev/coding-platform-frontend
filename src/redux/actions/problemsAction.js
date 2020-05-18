import * as types from "./actionTypes";
import * as problemApi from "../../api/problemsApi";
import { beginApiCall } from "./apiStatusActions";

export function setProblemsData(data) {
  let payload = [];
  for (let i = 0; i < data.length; i++) {
    payload.push(data[i]);
  }
  return { type: types.SET_ALL_PROBLEMS_DATA, payload };
}

export function getAllProblems() {
  beginApiCall();
  return function (dispatch) {
    return problemApi
      .getAllProblems()
      .then((problems) => {
        if (problems.error) {
          let err = new Error();
          err.msg = "Error in fetching all problems";
          throw err;
        } else {
          dispatch(setProblemsData(problems));
        }
      })
      .catch((e) => {
        console.log(e);
        let err = new Error();
        err.msg = "Error in fetching all problems";
        throw err;
      });
  };
}

export function saveProblem(data) {
  return { type: types.SAVE_PROBLEM, payload: data };
}
export function createORUpdateProblem(data) {
  beginApiCall();
  return function (dispatch) {
    return problemApi
      .createORUpdateProblem(data)
      .then((res) => {
        if (res.error) {
          let err = new Error();
          err.msg = "Error in saving problem";
          throw err;
        } else {
          dispatch(saveProblem(data));
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}
