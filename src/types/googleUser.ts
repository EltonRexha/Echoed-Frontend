type GoogleUser = {
  email: string;
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  googleUserId: string;
  OAuth: boolean;
  profileUrl?: string | null;
  userId?: string | null;
  UserType: 'google';
};

export default GoogleUser;
