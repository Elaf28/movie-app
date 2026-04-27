import React from "react";
import { Heart, Bookmark, Star } from "lucide-react";

const MovieEngagementSkeleton = () => {
  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="flex items-center justify-center">
        <Heart size={22} strokeWidth={1.5} className="text-muted sm:size-7" />
      </div>

      <div className="flex items-center justify-center">
        <Bookmark
          size={22}
          strokeWidth={1.5}
          className="text-muted sm:size-[28px]"
        />
      </div>

      <div className="flex items-center gap-2">
        <Star
          size={22}
          strokeWidth={1.5}
          className="text-muted sm:size-[28px]"
        />

        <div className="flex items-center gap-2">
          <div className="bg-muted h-6 w-10 animate-pulse rounded-md sm:h-7 sm:w-12" />

          {/* Separator */}
          <span className="text-muted-foreground text-base font-medium sm:text-lg">
            |
          </span>

          <div className="bg-muted h-5 w-16 animate-pulse rounded-md sm:h-6 sm:w-20" />
        </div>
      </div>
    </div>
  );
};

export default MovieEngagementSkeleton;
