import axios from '@/services/axios';
import { logout } from '@/services/state/redux/slices/AuthSlice';
import store from '@/services/state/redux/store';

export default async function logoutUser() {
  await axios.post('/auth/logout', null, {
    withCredentials: true,
  });
  store.dispatch(logout());
  window.location.href = '/';
}
