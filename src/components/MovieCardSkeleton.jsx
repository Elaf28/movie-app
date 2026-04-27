import React from 'react';

const MovieCardSkeleton = () => {
  return (
    <div className="group relative flex w-[120px] shrink-0 flex-col transition-all duration-300 sm:w-[140px] md:w-[160px] lg:w-[180px]">
      <div className="relative h-[180px] overflow-hidden rounded-2xl border border-border bg-card shadow-lg sm:h-[210px] md:h-[240px] lg:h-[270px]">
        <div className="h-full w-full animate-pulse bg-muted" />
      </div>

      <div className="mt-3 px-1">
        <div className="h-[18px] w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-1.5 h-[14px] w-1/2 animate-pulse rounded-md bg-muted" />

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 animate-pulse rounded-sm bg-muted"
              />
            ))}
          </div>
          <div className="h-[13px] w-8 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
