import Axios from 'axios';
import store from './state/redux/store';
import { login } from './state/redux/slices/AuthSlice';
import { getCurrentUser } from './api/User';
import logoutUser from '@/utils/logoutUser';

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
        const isAuth = store.getState().Authentication.isAuthenticated;
        if (isAuth) {
          alert('Logging out user');
          logoutUser();
        }

        return Promise.reject(error);
      }

      retryCount += 1;

      //try to refresh token
      try {
        await axios.post('/auth/refresh', null, {
          withCredentials: true,
        });

        const response = await getCurrentUser();
        store.dispatch(login(response.user));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return Promise.reject(error);
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default axios;
