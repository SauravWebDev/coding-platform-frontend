import * as types from "./actionTypes";
import * as filtersApi from "../../api/filtersApi";

export function setFilters(data) {
  let payload = {
    difficulty: {},
    tag: {},
    language: {},
  };

  data.difficulty.forEach((item) => {
    payload.difficulty[item.id] = item.value;
  });
  data.tag.forEach((item) => {
    payload.tag[item.id] = item.value;
  });
  data.language.forEach((item) => {
    payload.language[item.id] = item.value;
  });
  return { type: types.GET_FILTER, payload };
}

export function getFilters() {
  return function (dispatch) {
    return filtersApi
      .getFilters()
      .then((data) => {
        if (data.error) {
          let err = new Error();
          err.msg = "Error in fetching filters";
          throw err;
        } else {
          dispatch(setFilters(data));
        }
      })
      .catch((e) => {
        let err = new Error();
        err.msg = "Error in fetching filters";
        throw err;
      });
  };
}
