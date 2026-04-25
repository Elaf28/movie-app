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
import Watchlist from './pages/Watchlist';
import FavoritesList from './pages/FavoritesList';
import SearchPage from './pages/SearchPages'
import Profile from './pages/Profile';

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
        element: <Register/>,
      },
      {
        path: 'login',
        element: <Login/>,
      },
      {
        path : 'Home',
        element : <Home />
      },
      {
        path: 'favorites',
        element: <FavoritesList />,
      },
      {
        path: 'watchlist',
        element: <Watchlist />,
      },
      {
        path:"/search" ,
        element: <SearchPage /> 
      },
      {
        path: 'profile',
        element: <Profile/>
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
