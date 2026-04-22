import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Root Route
      {
        index: true,
        element: <App />,
      },
      {
        path : 'Home',
        element : <Home />
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>,
);
