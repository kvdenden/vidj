import { combineReducers } from "redux";
import channelReducer from "./channelReducer";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";
import socketReducer from "./socketReducer";
import videoStatusReducer from "./videoStatusReducer";

export default combineReducers({
  channel: channelReducer,
  search: searchReducer,
  auth: authReducer,
  socket: socketReducer,
  videoStatus: videoStatusReducer
});
