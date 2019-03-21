import axios from "axios";

const parseResult = result => {
  const { videoId, title, description, videoThumbnails } = result;
  const thumbnail = videoThumbnails.find(thumb => thumb.quality === "default");
  return {
    videoId,
    title,
    description,
    thumbnail: thumbnail.url
  };
};

export default async query => {
  try {
    const response = await axios.get("https://invidio.us/api/v1/search", {
      params: { q: query }
    });
    const results = response.data.map(parseResult);
    return { results };
  } catch (error) {
    return { error };
  }
};
