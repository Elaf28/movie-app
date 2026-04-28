import React from "react";

function MoviePoster({ poster_path }) {
  return (
    <div className="w-[150px] lg:sticky lg:top-20 lg:w-full">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          alt="Movie Poster"
          className="mx-auto h-full w-full max-w-[300px] object-cover"
        />
      </div>
    </div>
  );
}

export default MoviePoster;
