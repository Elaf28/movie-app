/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback } from 'react';
import tmdbApi from '../services/axiosConfig';
import { useMovieActions } from '../hooks/useMovieActions';
import MovieCard from './MovieCard';

const TrailersSection = () => {
  const [trailers, setTrailers] = useState([]);
  const [activeTab, setActiveTab] = useState('Popular');
  const [bgImage, setBgImage] = useState('');
  const actions = useMovieActions();

  const endpoints = {
    Popular: '/movie/popular',
    Streaming: '/tv/on_the_air',
    On_TV: '/tv/popular',
    For_Rent: '/movie/upcoming',
    In_Theaters: '/movie/now_playing'
  };

  const fetchTrailers = useCallback(async () => {
    try {
      const { data } = await tmdbApi.get(endpoints[activeTab]);
      setTrailers(data.results);
      if (data.results[0]) setBgImage(`https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}`);
    } catch (err) { console.error(err); }
  }, [activeTab]);

  useEffect(() => { fetchTrailers(); }, [fetchTrailers]);

  return (
    <section 
      className="relative py-12 px-10 transition-all duration-700 bg-cover bg-center min-h-[380px]"
      style={{ backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.9), rgba(3, 37, 65, 0.8)), url(${bgImage})` }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-5 mb-8">
          <h2 className="text-2xl font-bold text-white">Latest Trailers</h2>
          <div className="flex border-2 border-[#1ed5ad] rounded-full font-semibold overflow-hidden">
            {Object.keys(endpoints).map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`px-4 py-1 text-xs md:text-sm transition-all ${activeTab === tab ? 'bg-[#1ed5ad] text-[#032541]' : 'text-white hover:bg-white/10'}`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
          {trailers.map(item => (
            <div key={item.id} onMouseEnter={() => setBgImage(`https://image.tmdb.org/t/p/original${item.backdrop_path}`)}>
              <MovieCard item={item} actions={actions} isHorizontal={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrailersSection;