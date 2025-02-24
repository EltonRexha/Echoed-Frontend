import HttpError from '@/Errors/httpError';
import axios from '@/services/axios';
import { ErrorResponse } from '@/types/errorResponse';
import { AxiosError, AxiosResponse } from 'axios';

export async function sendVerificationEmail(
  email: string
): Promise<{ message: string }> {
  try {
    const axiosResponse: AxiosResponse<{ message: string }> = await axios.post(
      'auth/user/email/verification',
      {
        email,
      }
    );
    return axiosResponse.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw new Error(
      error.response?.data?.error || 'Could not send verification email'
    );
  }
}

export async function verifyEmail(token: string): Promise<{ message: string }> {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      'auth/user/email/verify',
      { token }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    throw new HttpError(
      error.response?.status as number,
      error.response?.data?.error || 'Could not verify email'
    );
  }
}
