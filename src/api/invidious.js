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

const api = axios.create({ baseURL: "https://invidio.us/api/v1" });

export const search = async query => {
  try {
    const response = await api.get("/search", {
      params: { q: query }
    });
    const results = response.data.map(parseResult);
    return { results };
  } catch (error) {
    return { error };
  }
};

export const get = async videoId => {
  try {
    const response = await api.get(`/videos/${videoId}`);
    console.log(response.data);
  } catch (error) {
    return { error };
  }
};
