import axios from "axios";

const api = axios.create({
  baseURL: "https://api.jsdgrandslacs.org",
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");

  if (config.url.startsWith("/admin/") && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
