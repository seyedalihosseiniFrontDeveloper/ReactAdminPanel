import axios from "axios";

const httpService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const httpInterceptedService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

httpInterceptedService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpInterceptedService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { httpService, httpInterceptedService };
