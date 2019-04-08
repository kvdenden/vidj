import { combineReducers } from "redux";
import myChannelsReducer from "./myChannelsReducer";
import channelReducer from "./channelReducer";
import searchReducer from "./searchReducer";
import authReducer from "./authReducer";
import socketReducer from "./socketReducer";
import videoStatusReducer from "./videoStatusReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
  myChannels: myChannelsReducer,
  channel: channelReducer,
  search: searchReducer,
  auth: authReducer,
  socket: socketReducer,
  videoStatus: videoStatusReducer,
  notification: notificationReducer
});
