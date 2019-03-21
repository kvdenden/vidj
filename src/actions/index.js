import _ from "lodash";

import { FETCH_VIDEOS } from "./types";

import youtube from "../api/youtube";

export const searchVideos = query => async dispatch => {
  const response = query ? await youtube(query) : { results: [] };
  console.log(response);
  const results = response.results.map(result =>
    _.pick(result, ["id", "title", "description", "thumbnails"])
  );
  dispatch({
    type: FETCH_VIDEOS,
    payload: results
  });
};
