import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as auth from "../../api/auth";
import * as util from "../../util/util";

export function setCurrentUser(data) {
  let userData = util.decode(data);
  return { type: types.SET_CURRENT_USER_SUCCESS, userData };
}
export function signupSuccess() {
  let res = "success";
  return { type: types.SIGNUP_SUCCESS, res };
}
export function login(email, password) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return auth
      .logIn(email, password)
      .then(({ error, token }) => {
        if (!error) {
          localStorage.setItem("token", token);
          dispatch(setCurrentUser(token));
        } else {
          dispatch(apiCallError(error));
          throw error;
        }
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function signup(firsName, lastName, email, password) {
  return function(dispatch) {
    dispatch(beginApiCall());

    return auth
      .signup(firsName, lastName, email, password)
      .then(({ error }) => {
        if (!error) {
          dispatch(signupSuccess());
        } else {
          dispatch(apiCallError(error));
          throw error;
        }
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
