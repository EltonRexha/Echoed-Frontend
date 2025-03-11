import axios from '@/services/axios';

export default async function logoutUser() {
  await axios.post('/auth/logout', null, {
    withCredentials: true,
  });
  window.location.href = '/';
}
