/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback } from 'react';
import tmdbApi from '../services/axiosConfig';
import { useMovieActions } from '../hooks/useMovieActions';
import MovieCard from './MovieCard';

const MovieSection = ({ title, endpoints }) => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(Object.keys(endpoints)[0]);
  const actions = useMovieActions();

const fetchData = useCallback(async () => {
  try {
    const response = await tmdbApi.get(endpoints[activeTab], {
      params: {
        page: 1,
        language: 'en-US',
      }
    });
    setData(response.data.results);
  } catch (err) { console.error(err); }
}, [activeTab, endpoints]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center gap-5 mb-6">
        <h2 className="text-2xl font-bold text-[#032541]">{title}</h2>
        <div className="flex border-2 border-[#032541] rounded-full font-semibold overflow-hidden shadow-sm">
          {Object.keys(endpoints).map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-5 py-1 capitalize transition-all text-sm ${activeTab === tab ? 'bg-[#032541] text-[#90cea1]' : 'bg-white text-[#032541] hover:bg-gray-100'}`}
            >
              {tab.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-5 custom-scrollbar">
        {data.map(item => (
          <MovieCard key={item.id} item={item} actions={actions} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;