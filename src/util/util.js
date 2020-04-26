import { debounce } from "lodash";

const jwt = require("jsonwebtoken");

export function decode(token) {
  let { emailID, firstName, lastName } = jwt.decode(token.split(" ")[1]);
  return {
    emailID,
    firstName,
    lastName,
  };
}

export function validString(str) {
  return str && str.trim().length != 0;
}

export function debounceFn(fn, delayTime) {
  return debounce(fn, delayTime);
}
