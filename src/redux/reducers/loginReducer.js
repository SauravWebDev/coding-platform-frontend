import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function loginReducer(state = initialState.userDetails, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: Object.keys(action.userData).length > 0,
        data: action.userData
      };
    default:
      return state;
  }
}
