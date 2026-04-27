import React from "react";
import MovieEngagementSkeleton from "./MovieEngagementSkeleton";

const MovieHeaderSkeleton = () => {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 lg:mt-4">
        <div className="bg-muted h-7 w-full animate-pulse rounded-md sm:h-8 sm:w-3/4 md:h-9 lg:w-96" />

        <div className="flex items-center gap-x-2 sm:gap-x-3">
          <span className="text-muted hidden lg:inline-block">&bull;</span>
          <div className="bg-muted h-6 w-16 animate-pulse rounded-md" />
          <span className="text-muted">&bull;</span>
          <div className="bg-muted h-6 w-20 animate-pulse rounded-md" />
        </div>
      </div>

      <MovieEngagementSkeleton />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border-border h-10 w-20 animate-pulse rounded-full border px-3 py-1"
          />
        ))}
      </div>
    </>
  );
};

export default MovieHeaderSkeleton;
