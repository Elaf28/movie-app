/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import tmdbApi from '../services/axiosConfig';
import { useMovieStore } from '@/Store/zustand/useMovieStore'; 
import Hero from '../components/Hero';
import TrailersSection from '../components/TrailersSection';
import MovieSection from '../components/MovieSection';
import JoinSection from '../components/JoinSection';
import MovieCard from '../components/MovieCard';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  const { syncWithUser } = useMovieStore();

  const handleSearch = async () => {
    if (!searchTerm.trim()) { setIsSearching(false); return; }
    try {
      setIsSearching(true);
      const { data } = await tmdbApi.get('/search/multi', { params: { query: searchTerm } });
      setSearchResults(data.results);
    } catch (err) { console.error("Search failed", err); }
  };

  return (
   
    <div className="min-h-screen bg-white dark:bg-[var(--background)] text-black dark:text-[var(--foreground)] transition-colors duration-300">
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      
      <main className="space-y-2">
        {isSearching ? (
          <section className="max-w-5xl mx-auto px-6 py-12">
            
            <h2 className="text-2xl font-bold text-[#032541] dark:text-[var(--chart-2)] mb-8 border-l-4 border-[#01b4e4] dark:border-[var(--primary)] pl-4 transition-colors">
              Search Results
            </h2>
            
            <div className="flex flex-col gap-4">
              {searchResults.map(movie => (
                movie.poster_path && (
                  <MovieCard 
                    key={movie.id} 
                    item={movie} 
                    isSearchView={true} 
                  />
                )
              ))}
            </div>
          </section>
        ) : (
          <div className="flex flex-col gap-8 pb-10">
            <MovieSection 
              title="Trending" 
              endpoints={{ Today: '/trending/all/day', This_Week: '/trending/all/week' }} 
            />
            
            <TrailersSection /> 

            <MovieSection 
              title="What's Popular" 
              endpoints={{ 
                Streaming: '/tv/popular', 
                On_TV: '/tv/top_rated', 
                For_Rent: '/movie/upcoming',
                In_Theaters: '/movie/now_playing' 
              }} 
            />

            <MovieSection 
              title="Free To Watch" 
              endpoints={{ 
                Movies: '/discover/movie?sort_by=vote_count.desc', 
                TV: '/discover/tv?sort_by=vote_count.desc' 
              }} 
            />

            <JoinSection />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;