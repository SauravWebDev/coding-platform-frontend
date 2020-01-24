import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function problemReducer(state = initialState.problems, action) {
  switch (action.type) {
    case types.SET_ALL_PROBLEMS_DATA:
      return { ...state, data: action.payload };
    case types.IS_ALL_PROBLEM_LOADED_SUCCESSFULLY:
      return { ...state, loading: action.payload };
    case types.SET_PROBLEMS_ERROR:
      return { ...state, error: Error(action.payload) };
    default:
      return state;
  }
}
