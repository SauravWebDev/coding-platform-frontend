import * as types from "./actionTypes";
import * as auth from "../../api/auth";
import { decode, getCookieByName } from "../../util/util";
import Cookies from "js-cookie";

export function setCurrentUser(data) {
  let userData = decode(data);
  return { type: types.SET_CURRENT_USER_SUCCESS, userData };
}
export function incrementCounter(data) {
  return { type: "add", data };
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
          dispatch(setCurrentUser(getCookieByName("ac-token")));
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

function setDefaultUsetDetails() {
  let res = "success";
  return { type: types.LOG_OUT, res };
}
export function logout() {
  return function (dispatch) {
    Cookies.remove("ac-token", { path: "" });
    dispatch(setDefaultUsetDetails());
  };
}
