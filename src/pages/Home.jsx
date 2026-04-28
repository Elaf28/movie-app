/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tmdbApi from '../services/axiosConfig';
import { useMovieStore } from '@/Store/zustand/useMovieStore'; 
import Hero from '../components/Hero';
import TrailersSection from '../components/TrailersSection';
import MovieSection from '../components/MovieSection';
import JoinSection from '../components/JoinSection';
import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import { Search, TrendingUp } from 'lucide-react';

function Home() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [navSearchTerm, setNavSearchTerm] = useState(""); 
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [apiTrending, setApiTrending] = useState([]); // لحفظ الداتا من الـ API

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await tmdbApi.get('/trending/all/day');
        const trends = data.results.slice(0, 10).map(item => item.title || item.name);
        setApiTrending(trends);
      } catch (err) {
        console.error("Failed to fetch trending", err);
      }
    };
    fetchTrending();
  }, []);

  const handleHeroSearch = async () => {
    if (!searchTerm.trim()) { setIsSearching(false); return; }
    try {
      setIsSearching(true);
      setIsLoadingSearch(true);
      const { data } = await tmdbApi.get('/search/multi', { params: { query: searchTerm } });
      const filtered = (data.results || []).filter(item => item.poster_path);
      setSearchResults(filtered);
    } catch (err) { console.error("Search failed", err); } 
    finally { setIsLoadingSearch(false); }
  };

  const handleNavAction = (term) => {
    const finalTerm = term || navSearchTerm;
    if (finalTerm.trim()) {
      setIsDropdownOpen(false);
      navigate(`/search?query=${encodeURIComponent(finalTerm)}`);
    }
  };

  const trendingEndpoints = useMemo(() => ({ Today: '/trending/all/day', This_Week: '/trending/all/week' }), []);
  const popularEndpoints = useMemo(() => ({ Streaming: '/tv/popular', On_TV: '/tv/top_rated', For_Rent: '/movie/upcoming', In_Theaters: '/movie/now_playing' }), []);
  const freeEndpoints = useMemo(() => ({ Movies: '/discover/movie?sort_by=vote_count.desc', TV: '/discover/tv?sort_by=vote_count.desc' }), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--background)] to-[var(--card)] text-[var(--foreground)] transition-colors duration-500">
      
      <div className="fixed top-[64px] left-0 right-0 z-[100] bg-white border-b border-gray-200 w-full py-1.5 px-10">
        <div className="max-w-7xl mx-auto relative">
            <div className="relative flex items-center h-8">
                <Search className="absolute left-0 text-gray-400" size={16} />
                <input 
                    type="text"
                    placeholder="Search for a movie, tv show, person..."
                    className="w-full bg-transparent text-black pl-7 pr-4 outline-none text-sm italic placeholder:text-gray-400"
                    value={navSearchTerm}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => setNavSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNavAction()}
                />
            </div>

            {isDropdownOpen && (
                <div className="absolute top-full left-[-40px] right-[-40px] bg-white shadow-2xl z-[110] border-t border-gray-100 max-h-[400px] overflow-y-auto">
                    <div className="sticky top-0 bg-gray-50 px-10 py-2 border-b border-gray-200 flex items-center gap-2 text-black z-10">
                        <TrendingUp size={16} />
                        <span className="text-sm font-bold uppercase tracking-wider">Trending Right Now</span>
                    </div>
                    <div className="flex flex-col px-6">
                        {apiTrending.map((item, index) => (
                            <button
                                key={index}
                                onMouseDown={() => handleNavAction(item)}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left border-b border-gray-50 last:border-0"
                            >
                                <Search size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-800 font-medium">{item}</span>
                            </button>
                        ))}
                    </div>
                    <div className="fixed inset-0 -z-10" onMouseDown={() => setIsDropdownOpen(false)}></div>
                </div>
            )}
        </div>
      </div>

      <div className="pt-12">
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleHeroSearch} />
      </div>
      
      <main className="space-y-4 pt-10">
        {isSearching ? (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-[var(--primary)] mb-10 flex items-center gap-3">
              <span className="w-2 h-8 bg-[var(--primary)] rounded-full"></span>
              Search Results
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {isLoadingSearch ? (
                [...Array(12)].map((_, i) => <MovieCardSkeleton key={i} />)
              ) : (
                searchResults.length > 0 ? (
                  searchResults.map(movie => <MovieCard key={movie.id} item={movie} isSearchView={true} />)
                ) : (
                  <div className="col-span-full py-20 text-center opacity-40 text-xl italic text-[var(--muted-foreground)]">No results match...</div>
                )
              )}
            </div>
          </section>
        ) : (
          <div className="flex flex-col gap-16 pb-20">
            <MovieSection title="Trending" endpoints={trendingEndpoints} />
            <div className="py-4 bg-[var(--secondary)]/30 backdrop-blur-sm border-y border-[var(--border)]">
                <TrailersSection /> 
            </div>
            <MovieSection title="What's Popular" endpoints={popularEndpoints} />
            <MovieSection title="Free To Watch" endpoints={freeEndpoints} />
            <JoinSection />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;