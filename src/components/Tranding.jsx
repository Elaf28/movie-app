/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import tmdbApi from '../services/axiosConfig';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day'); // 'day' أو 'week'

  const fetchTrending = async () => {
    try {
      const { data } = await tmdbApi.get(`/trending/all/${timeWindow}`);
      setMovies(data.results);
    } catch (err) {
      console.error("Error fetching trending:", err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [timeWindow]); // لما نغير الاختيار بين اليوم والأسبوع يجلب البيانات تاني

  return (
    <section className="max-w-7xl mx-auto px-10 pt-13 pb-10">
      {/* العنوان والتبديل بين اليوم والأسبوع */}
      <div className="flex items-center gap-5 mb-6">
        <h2 className="text-2xl font-bold">Trending</h2>
        <div className="flex border-2 border-[#032541] rounded-full font-semibold overflow-hidden">
          <button 
            onClick={() => setTimeWindow('day')}
            className={`px-5 py-1 rounded-full transition-colors ${timeWindow === 'day' ? 'bg-[#032541] text-[#90cea1]' : 'text-[#032541]'}`}
          >
            Today
          </button>
          <button 
            onClick={() => setTimeWindow('week')}
            className={`px-5 py-1 rounded-full transition-colors ${timeWindow === 'week' ? 'bg-[#032541] text-[#90cea1]' : 'text-[#032541]'}`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* قائمة الأفلام */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[150px] cursor-pointer group">
            <div className="relative shadow-md rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
                alt={movie.title}
                className="w-full h-[225px] object-cover"
              />
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-[14px] leading-tight group-hover:text-[#01b4e4]">
                {movie.title || movie.name}
              </h3>
              <p className="text-gray-500 text-[14px]">
                {movie.release_date || movie.first_air_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;