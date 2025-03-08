import GithubUser from '@/types/githubUser';
import GoogleUser from '@/types/googleUser';
import LocalUser from '@/types/localUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = LocalUser | GithubUser | GoogleUser | null;

interface UserState {
  user: User;
  isAuthenticated: boolean;
}

const inital: UserState = { user: null, isAuthenticated: false };

const user = createSlice({
  name: 'User',
  initialState: inital,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = user.actions;
export default user.reducer;
