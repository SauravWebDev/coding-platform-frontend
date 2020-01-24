import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function singleProblemReducer(
  state = initialState.createUpdateProblems,
  action
) {
  switch (action.type) {
    /*case types.PROBLEMS_LOADED_SUCCESSFULLY:
      return { ...state, loading: action.payload };
    case types.LOADING_All_PROBLEMS:
      return { ...state, loading: action.payload };
    case types.SET_PROBLEMS_ERROR:
      return { ...state, error: Error(action.payload) }; */
    default:
      return state;
  }
}
