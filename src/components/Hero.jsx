import React from 'react';

const Hero = ({ onSearch, searchTerm, setSearchTerm }) => {
  return (
    <section className="relative h-[360px] w-full flex flex-col justify-center px-10 text-white overflow-hidden">
      
      <div className="absolute inset-0 z-0 w-full h-full">
        <img 
          src="/img3.jpg" 
          alt="Background" 
          className="w-full h-full  " 
        />
        
        <div className="absolute inset-0  "></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-10">
          <h1 className="text-[3rem] font-bold leading-none mb-2">Welcome.</h1>
          <h3 className="text-[2rem] font-semibold leading-tight">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>

        <div className="relative mt-8">
          <input 
            type="text" 
            placeholder="Search for a movie, tv show, person......"
            className="w-230 h-[46px] rounded-full px-6 text-[1.1rem] text-white outline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch && onSearch()}
          />
          <button 
            onClick={onSearch}
            className="absolute  top-0 h-[46px] px-8 rounded-full bg-gradient-to-r from-[#1ed5a9] to-[#01b4e4] font-bold text-white hover:text-black transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;