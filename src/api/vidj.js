import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });

export const get = async channelId => {
  const response = await api.get(`/channels/${channelId}`);
  return response.data;
};

export const addVideo = async (channelId, videoId) => {
  const response = await api.post(`/channels/${channelId}/add`, { videoId });
  return response.data;
};

export const nextVideo = async channelId => {
  const response = await api.post(`/channels/${channelId}/next`);
  return response.data;
};

export const moveVideo = async (channelId, from, to) => {
  const response = await api.post(`/channels/${channelId}/move`, { from, to });
  return response.data;
};
