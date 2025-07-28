import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3333",
  // withCredentials: true,
});

// const tokenInStorage = localStorage.getItem(APP_AUTHENTICATION_ID) ?? null;

// if (!tokenInStorage) {
//   localStorage.clear();
//   sessionStorage.clear();
// }

// if (tokenInStorage) {
//   const token = tokenInStorage.toString();
//   API.defaults.headers.common.Authorization = `Bearer ${token}`;
// }

API.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export { API };
