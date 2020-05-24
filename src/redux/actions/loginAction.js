import * as types from "./actionTypes";
import * as auth from "../../api/auth";
import * as util from "../../util/util";
import Cookies from "js-cookie";

export function setCurrentUser(data) {
  let userData = util.decode(data);
  return { type: types.SET_CURRENT_USER_SUCCESS, userData };
}
export function signupSuccess() {
  let res = "success";
  return { type: types.SIGNUP_SUCCESS, res };
}
export function login(email, password) {
  return function (dispatch) {
    return auth
      .logIn(email, password)
      .then(({ error }) => {
        if (!error) {
          dispatch(setCurrentUser(Cookies.get("ac-token")));
        } else {
          throw error;
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function signup(firsName, lastName, email, password) {
  return function (dispatch) {
    return auth
      .signup(firsName, lastName, email, password)
      .then(({ error }) => {
        if (!error) {
          dispatch(signupSuccess());
        } else {
          throw error;
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}
