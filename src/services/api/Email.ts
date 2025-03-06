import axios from '@/services/axios';
import { AxiosResponse } from 'axios';

export async function sendVerificationEmail(
  email?: string,
  username?: string,
  userId?: string
): Promise<{ message: string }> {
  const axiosResponse: AxiosResponse<{ message: string }> = await axios.post(
    'auth/user/email/verification',
    {
      user: {
        email,
        username,
        id: userId,
      },
    }
  );
  return axiosResponse.data;
}

export async function verifyEmail(token: string): Promise<{ message: string }> {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    'auth/user/email/verify',
    { token }
  );
  return response.data;
}

export async function sendResetPasswordEmail(
  email?: string,
  username?: string,
  userId?: string
): Promise<{ message: string }> {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    'auth/user/email/send-reset-password',
    {
      user: {
        email,
        username,
        id: userId,
      },
    }
  );
  return response.data;
}
