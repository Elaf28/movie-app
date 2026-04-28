import { useMovieCredits } from "@/hooks/useMovieCredits";
import React from "react";
import MovieCrew from "./MovieCrew";
import TopCast from "./TopCast";
import MovieCrewSkeleton from "./MovieCrewSkeleton";
import TopCastSkeleton from "./TopCastSkeleton";

function MovieCredits({ movieId }) {
  const { crew, topCast, isLoading } = useMovieCredits(movieId);

  if (isLoading) {
    return (
      <div>
        <MovieCrewSkeleton />
        <TopCastSkeleton />
      </div>
    );
  }

  return (
    <div>
      <MovieCrew crew={crew} />
      <TopCast topCast={topCast} />
    </div>
  );
}

export default MovieCredits;
