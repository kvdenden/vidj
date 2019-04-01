import { START_AUTH, AUTH_SUCCESS } from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_AUTH:
      return { ...state, loading: true };
    case AUTH_SUCCESS:
      return { loading: false, token: action.payload };
    default:
      return state;
  }
};
