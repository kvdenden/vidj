import { combineReducers } from "redux";
import channelReducer from "./channelReducer";
import searchReducer from "./searchReducer";
import playlistReducer from "./playlistReducer";
import authReducer from "./authReducer";

export default combineReducers({
  channel: channelReducer,
  search: searchReducer,
  playlist: playlistReducer,
  auth: authReducer
});
