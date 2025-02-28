import { configureStore } from '@reduxjs/toolkit';
import emailVerificationReducer from './slices/emailVerificationTimeoutSlice';

const store = configureStore({
  reducer: {
    emailVerificationTimedOut: emailVerificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
