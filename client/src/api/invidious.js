import axios from "axios";
import { memoize } from "lodash";

const parseResult = result => {
  const {
    videoId,
    title,
    description,
    videoThumbnails,
    lengthSeconds
  } = result;
  const thumbnail = videoThumbnails.find(thumb => thumb.quality === "default");
  return {
    videoId,
    title,
    description,
    duration: lengthSeconds,
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
    return parseResult(response.data);
  } catch (error) {
    return { error };
  }
};

export const memoized = {
  search: memoize(search),
  get: memoize(get)
};
