import axios from '@/services/axios';
import { AxiosResponse } from 'axios';

export async function sendVerificationEmail(
  email: string
): Promise<{ message: string }> {
  const axiosResponse: AxiosResponse<{ message: string }> = await axios.post(
    'auth/user/email/verification',
    {
      email,
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
