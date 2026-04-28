import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const TopCastSkeleton = () => {
  return (
    <div className="mt-8">
      <div className="bg-muted h-6 w-24 animate-pulse rounded-md sm:h-7 sm:w-28" />

      <ScrollArea className="py-6 whitespace-nowrap">
        <div className="flex space-x-4 sm:space-x-8">
          {[...Array(8)].map((_, i) => (
            <figure
              key={i}
              className="flex w-24 shrink-0 flex-col items-center sm:w-36"
            >
              <div className="bg-muted h-20 w-20 animate-pulse rounded-full sm:h-28 sm:w-28" />

              <figcaption className="flex flex-col items-center pt-2 text-center">
                <div className="bg-muted h-3 w-16 animate-pulse rounded-md sm:h-4 sm:w-20" />
                <div className="bg-muted mt-1 h-3 w-12 animate-pulse rounded-md sm:h-4 sm:w-16" />
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default TopCastSkeleton;
