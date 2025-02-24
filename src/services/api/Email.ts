import axios from '@/services/axios';

export async function sendVerificationEmail(email: string) {
  const response = await axios.post('auth/user/email/verification', { email });
  return response;
}
