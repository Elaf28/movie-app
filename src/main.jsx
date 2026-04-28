import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import './App.css';
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import FavoritesList from "./pages/FavoritesList";
import SearchPage from "./pages/SearchPages";
import Profile from "./pages/Profile";
import DiscoverMovies from "./pages/DiscoverMovies";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieDetails from "./pages/MovieDetails";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        // Root Route
        {
          index: true,
          element: <App />,
        },
        {
          path: "register",
          element: (
            <GuestRoute>
              <Register />
            </GuestRoute>
          ),
        },
        {
          path: "login",
          element: (
            <GuestRoute>
              <Login />
            </GuestRoute>
          ),
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "movie",
          children: [
            {
              path: "discover",
              element: <DiscoverMovies />,
            },
            {
              path: ":id",
              element: <MovieDetails />,
            },
          ],
        },
        {
          path: "favorites",
          element: (
            <ProtectedRoute>
              <FavoritesList />
            </ProtectedRoute>
          ),
        },
        {
          path: "watchlist",
          element: (
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>,
);
