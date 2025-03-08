import { Gender } from './gender';

type LocalUser = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImage: string | undefined;
  gender: Gender;
  country: string;
  dateOfBirth: Date;
  verified: boolean;
  UserType: 'local';
};

export default LocalUser;
