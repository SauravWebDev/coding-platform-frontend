import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function FilterReducer(state = initialState.filters, action) {
  switch (action.type) {
    case types.GET_FILTER:
      return action.payload;
    default:
      return state;
  }
}
