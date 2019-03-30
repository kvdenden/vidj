import { combineReducers } from "redux";
import channelReducer from "./channelReducer";
import searchReducer from "./searchReducer";
import playlistReducer from "./playlistReducer";
import authReducer from "./authReducer";
import socketReducer from "./socketReducer";

export default combineReducers({
  channel: channelReducer,
  search: searchReducer,
  playlist: playlistReducer,
  auth: authReducer,
  socket: socketReducer
});
