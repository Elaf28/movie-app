import React from 'react';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';

function MovieGrid({ movies, isLoading }) {
  if (isLoading) {
    return (
      <div
        className="grid gap-5 mt-8"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
      >
        {[...Array(20)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid gap-5 mt-8"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
