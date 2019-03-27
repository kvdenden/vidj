import { AUTH_SUCCESS } from "../actions/types";

const INITIAL_STATE = {
  token: localStorage.getItem("token")
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
