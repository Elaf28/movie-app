# Movie App

A modern React movie discovery app built with Vite, Tailwind CSS, and TMDb API integration.

## Overview

This project is a responsive movie application featuring:
- Home page with trending and popular movies
- Movie discovery and search functionality
- Movie detail pages with cast, crew, trailers, and related titles
- Skeleton loaders for cards, movie details, trailers, cast, and crew while data is loading
- Watchlist and favorites pages guarded by protected routes
- User authentication flow with register/login pages and guest route behavior
- Dynamic routing using React Router v7
- Global state management using Zustand
- Reusable UI components with shadcn/ui and Tailwind CSS

## What’s included

### Core technologies
- React 19
- Vite 4
- React Router v7
- Tailwind CSS v4
- Zustand for client state management
- Axios for API requests
- TMDb API integration
- shadcn/ui + Radix UI primitives for accessible UI components
- Lucide icons and React icons
- react-hook-form for form handling
- react-hot-toast for notifications

### UI and interaction libraries
- `@base-ui/react` and `radix-ui` for UI primitives
- `@vidstack/react` for media/video handling
- `embla-carousel-react` for carousel experiences
- `react-resizable-panels` for responsive panel layouts
- `react-day-picker` for date selection components
- `recharts` for charting and analytics UI
- `tw-animate-css` for animation utilities
- `cmdk` for command palette / lightweight keyboard interactions

### Styling and design
- Tailwind CSS with `@tailwindcss/vite` plugin
- `tailwind-merge` and `class-variance-authority` for class composition
- `@fontsource-variable/inter` for smooth typography
- Custom utilities in `src/lib/utils.js` and component-level CSS

### Validation and tooling
- `zod` with `@hookform/resolvers` for schema validation
- ESLint and Prettier Tailwind plugin for linting and formatting
- Vite dev server and production build tooling

## Project structure

- `src/App.jsx` — app entry component
- `src/main.jsx` — router setup and app render
- `src/services/axiosConfig.js` — TMDb Axios configuration and authorization
- `src/pages/` — page-level views like `Home`, `Login`, `Register`, `Profile`, `MovieDetails`, `DiscoverMovies`, `Watchlist`, `FavoritesList`, `SearchPages`
- `src/components/` — reusable components and UI primitives
- `src/hooks/` — custom hooks for movies, credits, videos, and actions
- `src/layouts/MainLayout.jsx` — main layout and shared page wrapper
- `src/constants/` — constants for genres and sort options
- `src/Store/zustand/` — state management store files
- `src/utils/movieHelpers.js` — movie helper functions

## Environment variables

This app requires TMDb credentials configured in a `.env` file at the project root:

```env
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local development URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Available scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run lint` — run ESLint across the project
- `npm run preview` — preview the production build locally

## Notes

- The app uses `createBrowserRouter` from React Router for nested routing.
- Protected routes keep `favorites`, `watchlist`, and `profile` accessible only to authenticated users.
- API requests are authenticated with `Bearer` token headers and TMDb API key query params.

## License

This project is open for learning and customization. Update the README license section as needed.
