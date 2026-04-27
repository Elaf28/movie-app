import React from "react";

const MovieTrailerPlayerSkeleton = () => {
  return (
    <div className="flex max-h-60 justify-center overflow-hidden rounded-3xl md:max-h-96">
      <div className="bg-muted relative aspect-video w-full animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-muted-foreground border-t-primary h-12 w-12 animate-spin rounded-full border-4" />
        </div>
      </div>
    </div>
  );
};

export default MovieTrailerPlayerSkeleton;
