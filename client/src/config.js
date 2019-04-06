export const VIDJ_SERVER_URL =
  process.env.REACT_APP_VIDJ_SERVER_URL || "http://localhost:8080";

export const VIDJ_SOCKET_URL =
  process.env.REACT_APP_VIDJ_SOCKET_URL || VIDJ_SERVER_URL;

export default {
  VIDJ_SERVER_URL,
  VIDJ_SOCKET_URL
};
