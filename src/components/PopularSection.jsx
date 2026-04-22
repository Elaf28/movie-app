import React, { useState, useEffect } from 'react';
import tmdbApi from '../services/axiosConfig';

const PopularSection = () => {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('streaming');

  const apiMap = {
    streaming: '/movie/top_rated',
    on_tv: '/tv/popular',
    for_rent: '/movie/upcoming',
    in_theaters: '/movie/now_playing'
  };

  useEffect(() => {
    const fetchPopular = async () => {
      const { data } = await tmdbApi.get(apiMap[activeTab]);
      setItems(data.results);
    };
    fetchPopular();
  }, [activeTab]);

  return (
    <section className="max-w-7xl mx-auto px-10 py-12">
      <div className="flex items-center gap-5 mb-6">
        <h2 className="text-2xl font-bold">What's Popular</h2>
        <div className="flex border-2 border-[#032541] rounded-full font-semibold">
           <button 
             onClick={() => setActiveTab('streaming')}
             className={`px-5 py-1 rounded-full ${activeTab === 'streaming' ? 'bg-[#032541] text-[#90cea1]' : ''}`}
           >Streaming</button>
           <button 
             onClick={() => setActiveTab('on_tv')}
             className={`px-5 py-1 rounded-full ${activeTab === 'on_tv' ? 'bg-[#032541] text-[#90cea1]' : ''}`}
           >On TV</button>
        </div>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-6">
        {items.map(item => (
          <div key={item.id} className="min-w-[150px]">
            <img 
              className="rounded-xl shadow-md h-[225px] object-cover" 
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
              alt="" 
            />
            <h3 className="font-bold mt-2 text-sm">{item.title || item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularSection;