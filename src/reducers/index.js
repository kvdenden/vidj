import { combineReducers } from "redux";
import channelReducer from "./channelReducer";
import searchReducer from "./searchReducer";
import playlistReducer from "./playlistReducer";

export default combineReducers({
  channel: channelReducer,
  search: searchReducer,
  playlist: playlistReducer
});
