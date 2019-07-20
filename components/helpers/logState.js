import { getToken, signIn, signOut } from "../../util";

export function logState(loggedIn = false, jwt) {
  if (loggedIn) {
    signIn(jwt);
  } else {
    signOut();
  }
  return loggedIn;
}

module.exports = logState;
