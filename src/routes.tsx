import { createBrowserRouter } from 'react-router-dom';
import GettingStartedPage from './pages/GettingStartedPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GettingStartedPage />,
  },
]);

export default router;
