import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function errorReducer(state = initialState.APIerror, action) {
  switch (action.type) {
    case types.SET_ERROR:
      return action.payload;
    default:
      return state;
  }
}
