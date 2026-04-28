/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback } from 'react';
import tmdbApi from '../services/axiosConfig';
import { useMovieActions } from '../hooks/useMovieActions';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';  

const MovieSection = ({ title, endpoints }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [activeTab, setActiveTab] = useState(Object.keys(endpoints)[0]);
  const actions = useMovieActions();

  const fetchData = useCallback(async () => {
    setLoading(true); 
    try {
      const response = await tmdbApi.get(endpoints[activeTab], {
        params: {
          page: 1,
          language: 'en-US',
        }
      });
      setData(response.data.results);
    } catch (err) { 
      console.error(err); 
    } finally {
      setLoading(false); 
    }
  }, [activeTab, endpoints]); 

  useEffect(() => { 
    fetchData(); 
  }, [fetchData]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center gap-5 mb-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">{title}</h2>
        <div className="flex border-2 border-[var(--primary)] rounded-full font-semibold overflow-hidden shadow-sm">
          {Object.keys(endpoints).map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-5 py-1 capitalize transition-all text-sm ${activeTab === tab ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]'}`}
            >
              {tab.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-5 custom-scrollbar">
        {loading ? (
          [...Array(8)].map((_, i) => <MovieCardSkeleton key={i} />)
        ) : (
          data.map(item => (
            <MovieCard key={item.id} item={item} actions={actions} />
          ))
        )}
      </div>
    </section>
  );
};

export default MovieSection;