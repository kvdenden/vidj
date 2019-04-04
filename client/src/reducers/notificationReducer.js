import {
  SET_NOTIFICATION_MESSAGE,
  CLEAR_NOTIFICATION_MESSAGE
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_MESSAGE:
      return action.payload;
    case CLEAR_NOTIFICATION_MESSAGE:
      return null;
    default:
      return state;
  }
};
