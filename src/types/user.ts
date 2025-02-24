import { Gender } from '@/types/gender';

export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  country: string;
  gender: Gender;
  dateOfBirth: Date;
}
