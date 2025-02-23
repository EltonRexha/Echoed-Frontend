import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  counter: 60 * 10,
  ticking: false,
};

const slice = createSlice({
  name: 'emailTimeout',
  initialState: initalState,
  reducers: {
    inititalize: (state) => {
      const isTimedOutLocalStorage = localStorage.getItem(
        'emailVerificationIsTimedOut'
      );
      const isTimedOut = isTimedOutLocalStorage
        ? JSON.parse(isTimedOutLocalStorage)
        : false;
      if (isTimedOut) {
        state.timeRemaining = state.counter;
        state.ticking = true;
      }
    },
    substractSecond: (state) => {
      state.timeRemaining -= 1;
      if (state.timeRemaining === 0) {
        state.ticking = false;
      }
    },
    setTimer: (state) => {
      state.timeRemaining = state.counter;
      state.ticking = true;
      localStorage.setItem('emailVerificationIsTimedOut', JSON.stringify(true));
    },
    resetTimer: (state) => {
      state.timeRemaining = 0;
      state.ticking = false;
      localStorage.setItem(
        'emailVerificationIsTimedOut',
        JSON.stringify(false)
      );
    },
  },
});

export const { inititalize, substractSecond, resetTimer, setTimer } =
  slice.actions;
export default slice.reducer;
