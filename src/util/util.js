import { debounce } from "lodash";

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

export function validString(str) {
  return str && str.trim().length != 0;
}

export function debounceFn(fn, delayTime) {
  return debounce(fn, delayTime);
}
