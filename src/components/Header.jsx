import React, { useState, useEffect } from 'react';
import { Link } from 'react-router'; 
import { HiSun, HiMoon, HiHeart, HiBookmark, HiMenu } from 'react-icons/hi';
import { useAuthStore } from '../Store/zustand/useAuthStore';
import { Badge } from "@/components/ui/badge";
import { useMovieStore } from '@/Store/zustand/useMovieStore';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const watchlist = useMovieStore((state) => state.watchlist);
  const favorites = useMovieStore((state) => state.favorites);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); 
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    // <nav className="bg-background text-foreground border-b border-border shadow-md dark:shadow-[0_4px_20px_rgba(100,100,100,0.5)] px-6 py-4 sticky top-0 z-50">
    // <nav className="bg-card/70 backdrop-blur-3xl text-foreground px-6 py-4 fixed top-4 left-50 z-50 w-[1300px] mx-auto rounded-3xl">
    <nav className="bg-card/70 backdrop-blur-3xl text-foreground px-6 py-4 fixed top-4 z-50 w-[1300px] max-w-[95vw] left-1/2 -translate-x-1/2 rounded-3xl">
      <div className='flex justify-between items-center'>
        <div className="flex items-center gap-8">
          <Link to="/Home">
            <h1 style={{ fontFamily: '"Creepster", cursive' }} className="text-2xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              CineVerse
            </h1>
          </Link>

          <div className="hidden md:flex gap-6 font-medium">
            <Link to="/Home" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/movie/discover" className="hover:text-primary transition">
              Discover
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <button onClick={() => setDarkMode(!darkMode)} className="text-2xl hover:text-primary transition cursor-pointer">
            {darkMode ? <HiSun className='hover:text-yellow-500' /> : <HiMoon />}
          </button>

          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <>
                <Link to="/favorites" className="relative">
                  <HiHeart size={28} className="hover:text-destructive cursor-pointer transition" />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center rounded-full px-1 text-[10px] font-bold">
                      {favorites.length} 
                    </Badge>
                  )}
                </Link>

                <Link to="/watchlist" className="relative">
                  <HiBookmark size={28} className=" hover:text-yellow-500 cursor-pointer transition" />
                  {watchlist.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center rounded-full px-1 text-[10px] font-bold">
                      {watchlist.length}
                    </Badge>
                  )}
                </Link>

                <Link to="/profile">
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                </Link>

                <button onClick={logout} className="text-sm font-medium border-2 border-border rounded-sm p-1.5 hover:text-destructive hover:border-destructive transition cursor-pointer">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium border-2 border-border p-1.5 hover:text-primary hover:border-primary rounded-sm transition">
                  Login
                </Link>
                <Link to="/register" className="text-sm font-medium border-2 border-border p-1.5 hover:text-primary hover:border-primary rounded-sm transition">
                  Register
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-2xl cursor-pointer hover:text-primary" onClick={() => setMenuOpen(!menuOpen)}>
            <HiMenu />
          </button>
        </div>
      </div>


      {menuOpen && (
        <div className="md:hidden text-center mt-4 flex flex-col items-center gap-4 border-t border-border pt-4">
            <Link to="/Home" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/movie/discover" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
              Discover
            </Link>

          {user ? (
            <>
              <Link to="/favorites" onClick={() => setMenuOpen(false)} className="relative">
                  <HiHeart size={28} className="hover:text-destructive cursor-pointer transition" /> 
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center rounded-full px-1 text-[10px] font-bold">
                      {favorites.length} 
                    </Badge>
                  )}
                </Link>

                <Link to="/watchlist" onClick={() => setMenuOpen(false)} className="relative">
                  <HiBookmark size={28} className="hover:text-yellow-500 cursor-pointer transition" /> 
                  {watchlist.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center rounded-full px-1 text-[10px] font-bold">
                      {watchlist.length}
                    </Badge>
                  )}
                </Link>

                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                </Link>

                <button onClick={() => { logout(); setMenuOpen(false); }} className="text-sm font-medium border-2 border-border rounded-sm p-1.5 hover:text-destructive hover:border-destructive transition cursor-pointer">
                  Logout
                </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium border-2 border-border p-1.5 hover:text-primary hover:border-primary rounded-sm transition">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm font-medium border-2 border-border p-1.5 hover:text-primary hover:border-primary rounded-sm transition">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;