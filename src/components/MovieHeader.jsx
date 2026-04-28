import React from "react";
import { Badge } from "@/components/ui/badge";
import MovieEngagement from "@/components/MovieEngagement";
import { formatRuntime } from "@/utils/movieHelpers";
import MovieHeaderSkeleton from "./MovieHeaderSkeleton";
import { Link } from "react-router";

function MovieHeader({ movie, isLoading }) {
  if (isLoading) {
    return <MovieHeaderSkeleton />;
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold lg:mt-4">
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
          <Badge
            key={genre.id}
            variant="outline"
            asChild
            className="hover:bg-primary/25! hover:text-foreground! cursor-pointer p-3 text-base transition-all duration-200"
          >
            <Link to={`/movie/discover?genre=${genre.id}`}>{genre.name}</Link>
          </Badge>
        ))}
      </div>
    </>
  );
}

export default MovieHeader;
