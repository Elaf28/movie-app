/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import tmdbApi from '../services/axiosConfig';
import { useMovieActions } from '../hooks/useMovieActions';
import SearchCard from '../components/SearchCard';

function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const actions = useMovieActions();
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    tmdbApi.get('/search/multi', { params: { query } })
      .then(res => setResults(res.data.results))
      .catch(err => console.error("Search Error:", err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background)] transition-colors duration-300 pt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8">
        
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] p-4 rounded-t-xl font-bold shadow-lg">
            Search Results
          </div>
          
          <div className="border border-zinc-200 dark:border-[var(--sidebar-border)] rounded-b-xl p-4 bg-white dark:bg-[var(--sidebar)] shadow-sm">
            <div className="flex justify-between items-center bg-zinc-100 dark:bg-[var(--secondary)] p-3 rounded-lg border dark:border-[var(--border)]">
              <span className="font-medium dark:text-[var(--chart-2)]">Results Found</span>
              <span className="text-sm font-bold text-[var(--primary)]">{results.length}</span>
            </div>
          </div>
        </aside>

        <main className="flex-grow pb-10">
          {loading ? (
            <div className="text-center py-20 text-zinc-400 dark:text-[var(--chart-2)]/60 font-medium">
              Loading results...
            </div>
          ) : results.length > 0 ? (
            results.map(movie => movie.poster_path && (
              <SearchCard key={movie.id} item={movie} actions={actions} />
            ))
          ) : (
            <div className="text-zinc-500 dark:text-[var(--chart-2)]/80 text-center py-20">
              No results found for "<span className="text-[var(--primary)]">{query}</span>"
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SearchPage;