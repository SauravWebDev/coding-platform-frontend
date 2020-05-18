import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function problemReducer(state = initialState.problems, action) {
  switch (action.type) {
    case types.SET_ALL_PROBLEMS_DATA:
      return action.payload;

    case types.SAVE_PROBLEM: {
      let newState = [...state];
      if (!action.payload.id) {
        newState.push(action.payload);
      } else if (action.payload.id)
        newState.forEach((prob) => {
          if (prob.id == action.payload.id) {
            prob = action.payload;
            return;
          }
        });
      return newState;
    }
    default:
      return state;
  }
}
