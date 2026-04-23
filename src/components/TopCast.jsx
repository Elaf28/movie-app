import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function TopCast({ topCast }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-medium sm:text-2xl">Top Cast</h2>
      <ScrollArea className="py-6 whitespace-nowrap">
        <div className="flex space-x-4 sm:space-x-8">
          {topCast.map((actor) => (
            <figure
              key={actor.id}
              className="flex w-24 shrink-0 flex-col items-center sm:w-36"
            >
              <Avatar className="h-20 w-20 sm:h-28 sm:w-28">
                <AvatarImage
                  src={`https://image.tmdb.org/t/p/w154/${actor.profile_path}`}
                  alt={actor.name}
                />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {actor.name[0]}
                </AvatarFallback>
              </Avatar>
              <figcaption className="flex flex-col items-center pt-2 text-center">
                <span className="text-foreground text-xs leading-tight font-medium whitespace-normal sm:text-sm">
                  {actor.name}
                </span>
                <span className="text-muted-foreground mt-1 text-xs leading-tight whitespace-normal sm:text-sm">
                  {actor.character}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default TopCast;
