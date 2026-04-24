import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import MainLayout from './layouts/MainLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import DiscoverMovies from './pages/DiscoverMovies';

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
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'Home',
        element: <Home />,
      },
      {
        path: 'movie',
        children: [
          {
            path: 'discover',
            element: <DiscoverMovies />,
          },
        ],
      },
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
