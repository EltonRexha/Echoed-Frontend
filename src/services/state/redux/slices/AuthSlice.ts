import { User } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OptionalUser = User | null;

interface UserState {
  user: OptionalUser;
  isAuthenticated: boolean;
}

const initial: UserState = {
  user: null,
  isAuthenticated: false,
};

const user = createSlice({
  name: 'User',
  initialState: initial,
  reducers: {
    login(state, action: PayloadAction<OptionalUser>) {
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
