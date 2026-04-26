import React from 'react';

const GenreCardSkeleton = () => {
  return (
    <div className="group relative flex min-w-65 snap-start items-center overflow-hidden rounded-lg bg-card px-5">
      <div className="flex-1 py-3">
        <div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="relative ml-auto mt-3 -bottom-3">
        <div className="absolute -left-8 top-2 h-20 w-20 rotate-[-8deg] rounded-lg bg-muted/50" />

        <div className="aspect-square w-20 rotate-[9deg]">
          <div className="h-full w-full animate-pulse rounded-lg bg-muted shadow-xl" />
        </div>
      </div>
    </div>
  );
};

export default GenreCardSkeleton;
