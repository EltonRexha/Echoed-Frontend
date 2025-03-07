import { configureStore } from '@reduxjs/toolkit';
import emailVerificationReducer from './slices/emailVerificationTimeoutSlice';
import resetPasswordReducer from './slices/resetPasswordTimeoutSlice';

const store = configureStore({
  reducer: {
    emailVerificationTimeout: emailVerificationReducer,
    resetPasswordTimeout: resetPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
