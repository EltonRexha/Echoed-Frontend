import axios from '@/services/axios';
import { Gender } from '@/types/gender';
import GithubUser from '@/types/githubUser';
import GoogleUser from '@/types/googleUser';
import LocalUser from '@/types/localUser';
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
  const users = await axios.get('/users', {
    params: {
      email: email,
      username: username,
      id: id,
    },
  });

  return { user: users.data.users[0] };
}

export async function createUser(payload: {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: Gender;
  country: string;
  dateOfBirth: Date;
}): Promise<{ message: string }> {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    '/users',
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

export async function resetPassword(payload: {
  password: string;
  reset_password_token: string;
}): Promise<{ message: string }> {
  const response: AxiosResponse<{ message: string }> = await axios.put(
    '/auth/user/reset-password',
    payload
  );
  return response.data;
}

export async function getCurrentUser() {
  const response: AxiosResponse<{
    user: LocalUser | GoogleUser | GithubUser;
  }> = await axios.get('/users/me', { withCredentials: true });
  return response.data;
}

export async function convertOAuthUserToLocalUser(payload: {
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: Date;
}) {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    '/users/oauth',
    payload,
    { withCredentials: true }
  );
  return response.data;
}
