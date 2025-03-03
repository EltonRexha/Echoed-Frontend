import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const MAX_RETRIES = 1;
let retryCount = 0;

axios.interceptors.response.use(
  (success) => {
    return success;
  },
  async (error) => {
    const response = error.response;
    const config = error.config;
    if (response.status === 401) {
      if (retryCount >= MAX_RETRIES) {
        //reset retryCount for the next time
        retryCount = 0;

        //In case refresh didn't work we might as well logout user
        await axios.post('/auth/logout', null, {
          withCredentials: true,
        });

        return Promise.reject(error);
      }

      retryCount += 1;

      //try to refresh token
      await axios.post('/auth/refresh', null, {
        withCredentials: true,
      });

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default axios;
