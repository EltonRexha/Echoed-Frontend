import axios from '@/services/axios';
import { User } from '@/types/user';

interface SearchUser {
  email?: string;
  username?: string;
  id?: string;
}

interface BasicUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}


export async function getUser({
  email,
  username,
  id,
}: SearchUser): Promise<{user: BasicUserInfo}> {
  const users = await axios.get('/user', {
    params: {
      email: email,
      username: username,
      id: id,
    },
  });

  return {user: users.data.users[0]};
}

export async function createUser(payload: User): Promise<string> {
  await axios.post('/auth/user', payload);
  return 'Successfuly created user';
}
