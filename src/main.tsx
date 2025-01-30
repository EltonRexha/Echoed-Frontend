import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GettingStartedPage from './pages/GettingStartedPage';
// import { RouterProvider } from 'react-router-dom';
// import router from '@/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GettingStartedPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
