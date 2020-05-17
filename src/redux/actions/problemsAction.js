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
