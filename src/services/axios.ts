import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status >= 400) {
      return Promise.reject(
        new Error(`Request failed with status code ${error.response.status}`)
      );
    }
    return Promise.reject(error);
  }
);

export default axios;