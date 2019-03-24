import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import playlistReducer from "./playlistReducer";

export default combineReducers({
  search: searchReducer,
  playlist: playlistReducer
});
