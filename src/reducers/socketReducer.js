import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SOCKET_AUTH
} from "../actions/types";

const INITIAL_STATE = { connected: false, authenticated: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOCKET_CONNECT:
      return { ...state, connected: true };
    case SOCKET_DISCONNECT:
      return { ...state, connected: false, authenticated: false };
    case SOCKET_AUTH:
      return { ...state, authenticated: action.payload };
    default:
      return state;
  }
};
