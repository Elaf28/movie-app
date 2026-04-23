import React, { useState } from "react";
import { Heart, Bookmark, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function MovieEngagement({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  return (
    <div className="mt-4 flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`cursor-pointer transition-colors ${isFavorite ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`}
          >
            <Heart
              size={22}
              strokeWidth={1.5}
              className={`sm:size-7 ${isFavorite ? "fill-current" : "fill-none"}`}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {!isFavorite ? "Add to favorites" : "Remove from favorites"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setIsWatchlisted(!isWatchlisted)}
            className={`cursor-pointer transition-colors ${
              isWatchlisted
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Bookmark
              size={22}
              strokeWidth={1.5}
              className={`sm:size-[28px] ${isWatchlisted ? "fill-current" : "fill-none"}`}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {!isWatchlisted ? "Add to watchlist" : "Remove from watchlist"}
        </TooltipContent>
      </Tooltip>

      <div className="flex items-center gap-2">
        <Star
          size={22}
          strokeWidth={1.5}
          className="fill-yellow-500 text-yellow-500 sm:size-[28px]"
        />

        <div className="flex items-center gap-2">
          <div className="text-xl font-medium sm:text-2xl">
            {+movie.vote_average.toFixed(1)}
          </div>

          <span className="text-muted-foreground text-base font-medium sm:text-lg">
            |
          </span>

          <div className="text-muted-foreground text-base font-medium sm:text-lg">
            {movie.vote_count}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieEngagement;
