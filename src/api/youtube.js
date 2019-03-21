import youtubeSearch from "youtube-search";

const opts = {
  maxResults: 10,
  type: "video",
  videoEmbeddable: true,
  key: process.env.REACT_APP_YOUTUBE_API_KEY
};

export default query => youtubeSearch(query, opts);
