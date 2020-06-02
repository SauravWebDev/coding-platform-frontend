import { debounce } from "lodash";
import Cookies from "js-cookie";

const jwt = require("jsonwebtoken");

export function decode(token) {
  let { emailID, firstName, lastName, role } = jwt.decode(token);
  return {
    emailID,
    firstName,
    lastName,
    role,
  };
}
export function isJWTExpired(token) {
  let data = jwt.decode(token);
  if (Date.now() <= data.exp * 1000 - 10 * 60 * 1000) {
    return false;
  } else {
    return true;
  }
}
export function validString(str) {
  return str && str.trim().length != 0;
}

export function debounceFn(fn, delayTime) {
  return debounce(fn, delayTime);
}
export function getCookieByName(name) {
  return Cookies.get(name);
}
