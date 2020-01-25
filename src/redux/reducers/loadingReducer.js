import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function errorReducer(state = initialState.loading, action) {
  switch (action.type) {
    case types.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
}
