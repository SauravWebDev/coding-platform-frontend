import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function loginReducer(state = initialState.userData, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: Object.keys(action.userData).length > 0,
        data: action.userData,
      };
    }
    case types.LOG_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        data: {},
      };
    }
    default:
      return state;
  }
}
