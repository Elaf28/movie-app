import React from 'react';

const JoinSection = () => {
  return (
    <section className="relative bg-[#240046] py-16 mb-10 px-10 text-white overflow-hidden mx-3">
      
      <div className="absolute inset-0 z-0">
       <img 
        src={`${import.meta.env.BASE_URL}image.jpg`}
        alt="Background" 
        className="w-full h-full object-cover opacity-50 relative z-0" 
  />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(90,24,154,0.8)] to-[rgba(36,0,70,0.6)]"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
        <div className="md:w-3/5">
          <h4 className="text-5xl font-bold mb-5 leading-tight">Join Today</h4>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Get access to maintain your own <span className="italic opacity-70">custom personal lists</span>, track what you've seen and search and filter for <span className="italic opacity-70">what to watch next</span>—regardless if it's in theatres, on TV or available on popular streaming services like Netflix, Amazon Prime Video, Apple TV, Disney Plus, and Hulu.
          </p>
          <button className="bg-[#805ad5] px-10 py-3 rounded-md font-bold hover:bg-white hover:text-[#5a189a] transition-all duration-300 shadow-lg">
            Sign Up
          </button>
        </div>
        
        <div className="md:w-2/5 text-sm opacity-80 space-y-4">
          <ul className="list-disc list-outside pl-5 space-y-2.5">
            <li>Maintain a personal watchlist</li>
            <li>Filter by your subscribed streaming services and find something to watch</li>
            <li>Log the movies and TV shows you've seen</li>
            <li>Build custom lists</li>
            <li>Contribute to and improve our database</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;