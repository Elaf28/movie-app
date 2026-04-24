import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import tmdbApi from '../services/axiosConfig';
import { useMovieActions } from '../hooks/useMovieActions';
import MovieCard from '../components/MovieCard';

function SearchPage() {
  const [results, setResults] = useState([]);
  const actions = useMovieActions();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      tmdbApi.get('/search/multi', { params: { query } })
        .then(res => setResults(res.data.results))
        .catch(err => console.log(err));
    }
  }, [query]);

  return (
    <div className="max-w-[1300px] mx-auto px-6 py-10 mt-16 flex flex-col md:flex-row gap-8">
      
      <div className="w-full md:w-[260px] flex-shrink-0">
        <div className="bg-[#01b4e4] text-white p-4 rounded-t-xl font-bold">Search Results</div>
        <div className="border border-gray-200 rounded-b-xl p-4 space-y-4 shadow-sm">
          <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span className="font-semibold text-[#032541]">Movies</span>
            <span className="bg-white px-2 py-0.5 rounded text-xs text-gray-600 shadow-sm">{results.length}</span>
          </div>
          <div className="flex justify-between items-center p-2 text-gray-500">
            <span>TV Shows</span>
            <span className="text-xs">0</span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col gap-4">
        {results.map(movie => (
          movie.poster_path && (
            <MovieCard 
              key={movie.id} 
              item={movie} 
              actions={actions} 
              isSearchView={true};     
            />
          )
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
