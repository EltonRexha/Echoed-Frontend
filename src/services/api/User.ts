import axios from '@/services/axios';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

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
}: SearchUser): Promise<{ user: BasicUserInfo }> {
  const users = await axios.get('/user', {
    params: {
      email: email,
      username: username,
      id: id,
    },
  });

  return { user: users.data.users[0] };
}

export async function createUser(payload: User): Promise<{ message: string }> {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    '/auth/user',
    payload
  );
  return response.data;
}

export async function loginUserWithEmail(payload: {
  email: string;
  password: string;
}): Promise<{ message: string }> {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    '/auth/login',
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function loginUserWithUsername(payload: {
  username: string;
  password: string;
}): Promise<{ message: string }> {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    '/auth/login',
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
