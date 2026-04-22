/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import tmdbApi from '../services/axiosConfig';

const FreeToWatch = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('movie'); // 'movie' أو 'tv'

  const fetchData = async () => {
    try {
      const response = await tmdbApi.get(`/discover/${activeTab}`, {
        params: {
          sort_by: 'popularity.desc',
          include_adult: false,
          language: 'ar-SA'
        }
      });
      setData(response.data.results);
    } catch (err) {
      console.error("Error fetching free to watch:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <section className="max-w-7xl mx-auto px-10 py-12">
      <div className="flex items-center gap-5 mb-6">
        <h2 className="text-2xl font-bold">Free To Watch</h2>
        <div className="flex border-2 border-[#032541] rounded-full font-semibold overflow-hidden">
          <button 
            onClick={() => setActiveTab('movie')}
            className={`px-5 py-1 transition-all ${activeTab === 'movie' ? 'bg-[#032541] text-[#90cea1]' : 'text-[#032541]'}`}
          >
            Movies
          </button>
          <button 
            onClick={() => setActiveTab('tv')}
            className={`px-5 py-1 transition-all ${activeTab === 'tv' ? 'bg-[#032541] text-[#90cea1]' : 'text-[#032541]'}`}
          >
            TV
          </button>
        </div>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 custom-scrollbar">
        {data.map((item) => (
          <div key={item.id} className="min-w-[150px] group cursor-pointer">
            <div className="relative rounded-xl overflow-hidden shadow-lg h-[225px]">
              <img 
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                alt={item.title || item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {/* أيقونة الخيارات (الدويرة البيضاء) */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-white/70 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition">
                <span className="mb-2 font-bold">...</span>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm leading-tight hover:text-[#01b4e4]">
                {item.title || item.name}
              </h3>
              <p className="text-gray-500 text-[13px] mt-1">
                {item.release_date || item.first_air_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FreeToWatch;