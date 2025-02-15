import axios from '@/services/axios';

interface SearchUser {
  email?: string;
  username?: string;
  id?: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

export async function fetchUser({
  email,
  username,
  id,
}: SearchUser): Promise<User[]> {
  const users = await axios.get('/auth/user', {
    params: {
      email: email,
      username: username,
      id: id,
    },
  });

  return users.data;
}
