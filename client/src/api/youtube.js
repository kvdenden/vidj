import youtubeSearch from "youtube-search";

const opts = {
  maxResults: 10,
  type: "video",
  videoEmbeddable: true,
  key: process.env.REACT_APP_YOUTUBE_API_KEY
};

const parseResult = result => {
  const { id, title, description, thumbnails } = result;
  return {
    videoId: id,
    title,
    description,
    thumbnail: thumbnails.default.url
  };
};

export default async query => {
  const response = await youtubeSearch(query, opts);
  const results = response.results.map(parseResult);
  return { results };
};
