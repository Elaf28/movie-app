import { useSimilarMovies } from "@/hooks/useSimilarMovies";
import { useMovieActions } from "../hooks/useMovieActions";
import React from "react";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCard from "./MovieCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ScrollableRow from "./ScrollableRow";

function SimilarMovies({ movieId }) {
  const { movies, isLoading } = useSimilarMovies(movieId);
  const actions = useMovieActions();

  if (isLoading) {
    return (
      <ScrollArea className="pt-6 pb-8 whitespace-nowrap">
        <div className="flex space-x-4 sm:space-x-8">
          {[...Array(20)].map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

  return (
    <ScrollableRow className="py-6">
      {movies.map((item) => (
        <MovieCard key={item.id} item={item} actions={actions} />
      ))}
    </ScrollableRow>
    // <ScrollArea className="pt-6 pb-8 whitespace-nowrap">
    //   <div className="flex space-x-4 sm:space-x-8">
    //     {movies.map((item) => (
    //       <MovieCard key={item.id} item={item} actions={actions} />
    //     ))}
    //   </div>
    //   <ScrollBar orientation="horizontal" />
    // </ScrollArea>
  );
}

export default SimilarMovies;
