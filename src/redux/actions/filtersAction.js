import * as types from "./actionTypes";
import * as filtersApi from "../../api/filtersApi";

export function setFilters(data) {
  let payload = {};
  payload.difficulty = data.difficulty;
  payload.tag = data.tag;
  payload.language = data.language;
  return { type: types.GET_FILTER, payload };
}

export function getFilters() {
  return function(dispatch) {
    return filtersApi
      .getFilters()
      .then(data => {
        if (data.error) {
          let err = new Error();
          err.msg = "Error in fetching filters";
          throw err;
        } else {
          dispatch(setFilters(data));
        }
      })
      .catch(e => {
        console.log("Error in fetching filters ", e);
        let err = new Error();
        err.msg = "Error in fetching filters";
        throw err;
      });
  };
}
