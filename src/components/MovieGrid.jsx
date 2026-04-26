import React from 'react';
import MovieCard from './MovieCard';

function MovieGrid({ movies, isLoading }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 mt-8">
      {movies.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
