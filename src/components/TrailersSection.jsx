import React, { useState, useEffect } from 'react';
import tmdbApi from '../services/axiosConfig';
import { FaPlay } from 'react-icons/fa';

const TrailersSection = () => {
  const [trailers, setTrailers] = useState([]);
  const [activeTab, setActiveTab] = useState('popular');

  const apiMap = {
    popular: '/movie/popular',      
    streaming: '/tv/on_the_air',   
    on_tv: '/tv/popular',          
    for_rent: '/movie/upcoming',   
    in_theaters: '/movie/now_playing'
  };

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await tmdbApi.get(apiMap[activeTab], {
          params: { append_to_response: 'videos' } // بنحاول نسحب الفيديوهات مع الفيلم
        });
        setTrailers(response.data.results);
      } catch (err) {
        console.error("Error fetching trailers:", err);
      }
    };
    fetchTrailers();
  }, [activeTab]); // التحديث بيحصل هنا بس لما تدوسي على التاب

  return (
    <section className="bg-[#032541] py-10 px-10 text-white mt-10 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-5 mb-6">
          <h2 className="text-2xl font-bold">Latest Trailers</h2>
          
          <div className="flex border-2 border-[#1ed760] rounded-full overflow-hidden bg-[#032541]">
            {Object.keys(apiMap).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 text-sm font-semibold capitalize transition-all duration-300 ${
                  activeTab === tab ? 'bg-gradient-to-r from-[#c0feff] to-[#1ed760] text-[#032541]' : 'text-white hover:text-[#1ed760]'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
          {trailers.map((item) => (
            <div key={item.id} className="min-w-[300px] group cursor-pointer">
              <div className="relative h-[170px] rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-125 transition">
                    <FaPlay className="text-3xl text-white opacity-90" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                   <span className="mb-2 font-bold">...</span>
                </div>
              </div>
              
              <div className="text-center mt-3">
                <h3 className="font-bold text-lg group-hover:text-[#01b4e4] transition truncate">
                  {item.title || item.name}
                </h3>
                <p className="text-sm text-gray-400">Official Trailer</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrailersSection;