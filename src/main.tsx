import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GettingStartedPage from './pages/GettingStartedPage';
import SignupPage from './pages/SignupPage';
import { Provider } from 'react-redux';
import store from './services/state/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import VerifyEmailPage from './pages/VerifyEmailPage';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GettingStartedPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/account/verify" element={<VerifyEmailPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
