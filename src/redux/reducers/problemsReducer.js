import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function problemReducer(state = initialState.problems, action) {
  switch (action.type) {
    case types.SET_ALL_PROBLEMS_DATA:
      return action.payload;
    default:
      return state;
  }
}
