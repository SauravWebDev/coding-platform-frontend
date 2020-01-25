import * as types from "./actionTypes";

export default function(payload) {
  return { type: types.SET_LOADING, payload };
}
