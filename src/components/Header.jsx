import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // لازم تثبتي react-router-dom
import { HiSun, HiMoon } from 'react-icons/hi'; // مكتبة react-icons

const Navbar = () => {
const [darkMode, setDarkMode] = useState(
  localStorage.getItem('theme') === 'dark' // بيقرأ الحالة القديمة
);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark'); // بيسيف الحالة
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}, [darkMode]);

  return (
    <nav className="bg-[#032541] dark:bg-[#011526] text-white p-4 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-8">
        <Link to="/Home">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#90cea1] to-[#01b4e4] cursor-pointer">
            T&M
          </h1>
        </Link>

        <div className="hidden md:flex gap-6 font-semibold">
          <Link to="/movie/discover" className="hover:text-[#01b4e4] transition-colors">Discover</Link>
          <Link to="/tv" className="hover:text-[#01b4e4] transition-colors">TV Shows</Link>
          <Link to="/people" className="hover:text-[#01b4e4] transition-colors">People</Link>
          <Link to="/more" className="hover:text-[#01b4e4] transition-colors">More</Link>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl hover:text-[#90cea1] transition-all transform hover:scale-110"
        >
          {darkMode ? <HiSun className="text-yellow-400" /> : <HiMoon />}
        </button>

        <button className="text-xl">+</button>
        <div className="border border-white px-1 rounded text-sm hover:bg-white hover:text-[#032541] transition cursor-pointer">AR</div>
        
        <Link to="/login" className="font-semibold hover:text-[#01b4e4]">Login</Link>
        <Link to="/join" className="font-semibold hover:text-[#01b4e4]">Join T&M</Link>
      </div>
    </nav>
  );
};

export default Navbar;