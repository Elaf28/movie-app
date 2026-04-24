import React, { useState } from 'react';
import tmdbApi from '../services/axiosConfig';
import { useMovieActions } from '../hooks/useMovieActions';
import Hero from '../components/Hero';
import TrailersSection from '../components/TrailersSection';
import MovieSection from '../components/MovieSection';
import JoinSection from '../components/JoinSection';
import MovieCard from '../components/MovieCard';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const actions = useMovieActions();

  const handleSearch = async () => {
    if (!searchTerm.trim()) { setIsSearching(false); return; }
    try {
      setIsSearching(true);
      const { data } = await tmdbApi.get('/search/multi', { params: { query: searchTerm } });
      setSearchResults(data.results);
    } catch (err) { console.error("Search failed", err); }
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      
      <main className="space-y-2">
      {isSearching ? (
  <section className="max-w-5xl mx-auto px-6 py-12">
    <h2 className="text-2xl font-bold text-[#032541] mb-8 border-l-4 border-[#01b4e4] pl-4">Search Results</h2>
    
    {/* غيرنا الـ grid ليكون عمود واحد فقط عشان الكروت هتبقى عريضة */}
    <div className="flex flex-col gap-4">
      {searchResults.map(movie => (
        movie.poster_path && (
          <MovieCard 
            key={movie.id} 
            item={movie} 
            actions={actions} 
            isSearchView={true} // أهم سطر عشان يفعل التصميم الجديد
          />
        )
      ))}
    </div>
          </section>
        ) : (
          <>
            {/* Trending */}
            <MovieSection 
              title="Trending" 
              endpoints={{ Today: '/trending/all/day', This_Week: '/trending/all/week' }} 
            />
            
            {/* Trailers (Section with 5 tabs as requested) */}
            <TrailersSection /> 

            {/* Popular */}
            <MovieSection 
              title="What's Popular" 
              endpoints={{ 
                Streaming: '/tv/popular', 
                On_TV: '/tv/top_rated', 
                For_Rent: '/movie/upcoming',
                In_Theaters: '/movie/now_playing' 
              }} 
            />

            {/* Free To Watch */}
            <MovieSection 
              title="Free To Watch" 
              endpoints={{ 
                Movies: '/discover/movie?sort_by=vote_count.desc', 
                TV: '/discover/tv?sort_by=vote_count.desc' 
              }} 
            />

            <JoinSection />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;