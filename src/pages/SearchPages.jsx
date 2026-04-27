/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import tmdbApi from '../services/axiosConfig';
import { useMovieActions } from '../hooks/useMovieActions';
import SearchCard from '../components/SearchCard';
import SearchCardSkeleton from '../components/SearchCardSkeleton';
import AppPagination from '../components/AppPagination';

function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const actions = useMovieActions();
  const location = useLocation();
  const navigate = useNavigate();
  
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!query) return;
    setSearchInput(query);
    setLoading(true);
    
    tmdbApi.get('/search/multi', { 
      params: { 
        query: query,
        page: currentPage 
      } 
    })
      .then(res => {
        const filteredData = res.data.results.filter(movie => movie.poster_path);
        
        setResults(filteredData);
        setTotalPages(res.data.total_pages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => console.error("Search Error:", err))
      .finally(() => setLoading(false));
  }, [query, currentPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentPage(1); 
      navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background)] transition-colors duration-300">
      
      <div className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[var(--background)]/90 backdrop-blur-md border-b border-zinc-200 dark:border-[var(--border)] py-4">
        <div className="max-w-7xl mx-auto px-6">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
            <input 
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search movies, TV shows, people..."
              className="w-full pl-12 pr-12 py-2 bg-zinc-100 dark:bg-[var(--card)] rounded-lg text-lg outline-none focus:ring-2 focus:ring-[var(--primary)]/50 transition-all dark:text-white"
            />
            {searchInput && (
              <button 
                type="button" 
                onClick={() => setSearchInput("")} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8 mt-8">
        
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] p-4 rounded-t-xl font-bold shadow-md">
            Search Results
          </div>
          <div className="border border-zinc-200 dark:border-[var(--sidebar-border)] rounded-b-xl p-4 bg-white dark:bg-[var(--sidebar)] shadow-sm">
            <div className="flex justify-between items-center bg-zinc-100 dark:bg-[var(--secondary)] p-3 rounded-lg border dark:border-[var(--border)]">
              <span className="font-medium dark:text-[var(--chart-2)] text-xs">Shown Results</span>
              <span className="text-sm font-bold text-[var(--primary)]">
                {loading ? "..." : results.length}
              </span>
            </div>
          </div>
        </aside>

        <main className="flex-grow pb-10">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <SearchCardSkeleton key={i} />)}
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col items-center">
              <div className="space-y-4 w-full">
                {results.map(movie => (
                  <SearchCard key={movie.id} item={movie} actions={actions} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex  w-full mt-12  mr-90">
                  <AppPagination 
                    page={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={(newPage) => setCurrentPage(newPage)} 
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-zinc-500 text-center py-20 bg-zinc-50 dark:bg-[var(--card)] rounded-2xl border-2 border-dashed border-zinc-200 dark:border-[var(--border)]">
              No results with images found for "{query}"
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SearchPage;