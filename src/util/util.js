const jwt = require("jsonwebtoken");

export function decode(token) {
  let { emailID, firstName, lastName } = jwt.decode(token.split(" ")[1]);
  return {
    emailID,
    firstName,
    lastName
  };
}
