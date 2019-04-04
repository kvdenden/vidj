import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const auth = async () => {
  const response = await api.post("/auth");
  return response.data;
};

export const create = async () => {
  const response = await api.post("/channels");
  return response.data;
};

export const check = async channelId => {
  const response = await api.get(`/channels?id=${channelId}`);
  return response.data.length > 0;
};

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

export const removeVideo = async (channelId, index) => {
  const response = await api.post(`/channels/${channelId}/remove`, { index });
  return response.data;
};
