import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });

export const get = async channelId => {
  console.log(`getting data for channel ${channelId}`);
  const response = await api.get(`/channels/${channelId}`);
  return response.data;
};
