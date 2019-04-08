import axios from "axios";
import { VIDJ_SERVER_URL } from "../config";

const api = axios.create({ baseURL: VIDJ_SERVER_URL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const auth = async () => {
  const response = await api.post("/auth");
  return response.data;
};

export const index = async () => {
  const response = await api.get(`/channels`);
  return response.data;
};

export const create = async channelProps => {
  const response = await api.post("/channels", channelProps);
  return response.data;
};

export const deleteChannel = async channelId => {
  await api.delete(`/channels/${channelId}`);
};

export const check = async channelId => {
  const response = await api.get(`/channels/check?id=${channelId}`);
  return response.data;
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

export const upvoteVideo = async (channelId, index) => {
  const response = await api.post(`/channels/${channelId}/upvote`, { index });
  return response.data;
};

export const downvoteVideo = async (channelId, index) => {
  const response = await api.post(`/channels/${channelId}/downvote`, { index });
  return response.data;
};
