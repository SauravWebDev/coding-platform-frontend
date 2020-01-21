import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function problemReducer(state = initialState.problems, action) {
  switch (action.type) {
    case types.LOAD_All_Problems_SUCCESS:
      return action.problems;
    default:
      return state;
  }
}
