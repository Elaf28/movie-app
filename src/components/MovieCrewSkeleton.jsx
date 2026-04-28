import React from "react";
import { Separator } from "@/components/ui/separator";

const MovieCrewSkeleton = () => {
  return (
    <div className="mt-6 space-y-4">
      <Separator />

      <div className="flex flex-wrap gap-2 text-sm sm:text-base">
        <div className="bg-muted h-5 w-16 animate-pulse rounded-md sm:h-6" />
        <div className="bg-muted h-5 w-32 animate-pulse rounded-md sm:h-6 sm:w-40" />
      </div>

      <Separator />

      <div className="flex flex-wrap gap-2 text-sm sm:text-base">
        <div className="bg-muted h-5 w-16 animate-pulse rounded-md sm:h-6" />
        <div className="bg-muted h-5 w-40 animate-pulse rounded-md sm:h-6 sm:w-48" />
      </div>

      <Separator />

      <div className="flex flex-wrap gap-2 text-sm sm:text-base">
        <div className="bg-muted h-5 w-12 animate-pulse rounded-md sm:h-6" />
        <div className="bg-muted h-5 w-56 animate-pulse rounded-md sm:h-6 sm:w-72" />
      </div>

      <Separator />
    </div>
  );
};

export default MovieCrewSkeleton;
