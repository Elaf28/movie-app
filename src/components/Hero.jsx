import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="relative h-[300px] md:h-[360px] w-full flex flex-col justify-center px-6 md:px-10 text-white overflow-hidden">
      
      <div className="absolute inset-0 z-0 w-full h-full">
        <img 
          src="/img3.jpg" 
          alt="Background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-[#032541]/60"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-10">
          <h1 className="text-[2.5rem] md:text-[3rem] font-bold leading-none mb-2">Welcome.</h1>
          <h3 className="text-[1.5rem] md:text-[2rem] font-semibold leading-tight">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>

        {/* Search Bar Container */}
        <div className="relative mt-8 max-w-[1200px]">
          <input 
            type="text" 
            placeholder="Search for a movie, tv show, person......"
            className="w-full h-[46px] rounded-full px-6 text-[1.1rem] text-white outline focus:ring-2 focus:ring-[#01b4e4]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="absolute right-0 top-0 h-[46px] px-8 rounded-full bg-gradient-to-r from-[#1ed5a9] to-[#01b4e4] font-bold text-white hover:text-[#032541] transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
