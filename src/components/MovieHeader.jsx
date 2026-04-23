import React from "react";
import { Badge } from "@/components/ui/badge";
import MovieEngagement from "@/components/MovieEngagement";
import { formatRuntime } from "@/utils/movieHelpers";

function MovieHeader({ movie }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold">
        <h1 className="w-full text-xl font-bold sm:text-2xl sm:font-extrabold md:text-3xl lg:w-auto lg:text-4xl">
          {movie.title}
        </h1>

        <div className="flex items-center gap-x-2 sm:gap-x-3">
          <span className="hidden lg:inline-block">&bull;</span>
          <div>{new Date(movie.release_date).getFullYear()}</div>
          <span>&bull;</span>
          <div>{formatRuntime(movie.runtime)}</div>
        </div>
      </div>

      {/* <div className="text-muted-foreground mt-4 uppercase">
        {movie.tagline}
      </div> */}

      <MovieEngagement movie={movie} />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {movie.genres?.map((genre) => (
          <Badge key={genre.id} variant="outline" className="p-3 text-base">
            {genre.name}
          </Badge>
        ))}
      </div>
    </>
  );
}

export default MovieHeader;
