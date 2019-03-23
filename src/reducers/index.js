import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import videoReducer from "./videoReducer";

export default combineReducers({
  search: searchReducer,
  videos: videoReducer
});
