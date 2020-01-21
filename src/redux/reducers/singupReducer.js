import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function signupReducer(
  state = initialState.signupSuccess,
  action
) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return true;
    default:
      return state;
  }
}
