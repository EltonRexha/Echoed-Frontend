import { createSlice } from '@reduxjs/toolkit';

interface Timeout {
  /**Time remaining in seconds */
  timeRemaining: number;
  /**Counter in seconds */
  counter: number;
  ticking: boolean;
}

const initalState: Timeout = {
  timeRemaining: 0,
  //10 minutes
  counter:
    60 * parseInt(import.meta.env.VITE_RESET_PASSWORD_RESEND_TOKEN_TIMEOUT),
  ticking: false,
};

const slice = createSlice({
  name: 'resetPasswordTimeout',
  initialState: initalState,
  reducers: {
    substractSecond: (state) => {
      state.timeRemaining -= 1;
      if (state.timeRemaining === 0) {
        state.ticking = false;
      }
    },
    setTimer: (state) => {
      state.timeRemaining = state.counter;
      state.ticking = true;
    },
    resetTimer: (state) => {
      state.timeRemaining = 0;
      state.ticking = false;
    },
  },
});

export const { substractSecond, resetTimer, setTimer } = slice.actions;
export default slice.reducer;
