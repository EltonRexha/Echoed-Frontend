import { configureStore } from '@reduxjs/toolkit';
import emailVerificationTimedOut from './slices/emailVerificationTimeout';

const store = configureStore({
  reducer: {
    emailVerificationTimedOut
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
