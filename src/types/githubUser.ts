type GithubUser = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  OAuth: boolean;
  profileUrl?: string | null;
  userId?: string | null;
  githubUserId?: string;
  UserType: 'github'
};

export default GithubUser
