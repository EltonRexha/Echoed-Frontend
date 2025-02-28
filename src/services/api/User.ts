import HttpError from '@/Errors/httpError';
import axios from '@/services/axios';
import { ErrorResponse } from '@/types/errorResponse';
import { User } from '@/types/user';
import { AxiosError, AxiosResponse } from 'axios';

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
  try {
    const users = await axios.get('/user', {
      params: {
        email: email,
        username: username,
        id: id,
      },
    });

    return { user: users.data.users[0] };
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw new Error(
      error.response?.data?.error || 'Something wrong happened fetching user'
    );
  }
}

export async function createUser(payload: User): Promise<{ message: string }> {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      '/auth/user',
      payload
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw new HttpError(
      error.response?.status as number,
      error.response?.data?.error || 'Something went wrong creating user'
    );
  }
}
