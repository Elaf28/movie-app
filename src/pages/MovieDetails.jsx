import MovieTrailerPlayer from "@/components/MovieTrailerPlayer";

import { Separator } from "@/components/ui/separator";

import { useParams } from "react-router";
import MovieHeader from "@/components/MovieHeader";
import MovieCredits from "@/components/MovieCredits";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { Container } from "@/components/Container";
import MovieDetailsSkeleton from "@/components/MovieDetailsSkeleton";
import SimilarMovies from "@/components/SimilarMovies";

function MovieDetails() {
  const { id } = useParams();

  const { movie, isLoading } = useMovieDetails(id);

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  const FALLBACK_POSTER = "https://placehold.co/600x900/1c1c1c/2dd4bf?text=CineVerse";

  return (
    <>
      <Container className="pt-26 pb-8">
        <div className="w-full">
          <MovieTrailerPlayer movieId={id} movie={movie} />
        </div>

        <div className="relative mt-6 grid grid-cols-1 gap-4 lg:mt-4 lg:grid-cols-[300px_1fr] lg:gap-8">
          <div className="flex flex-row-reverse justify-between gap-4 lg:relative lg:block">
            <div className="w-[150px] lg:sticky lg:top-24 lg:w-full">
              <div className="bg-muted/20 aspect-[2/3] overflow-hidden rounded-2xl">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : FALLBACK_POSTER
                  }
                  alt={movie.title || "Movie Poster"}
                  className="mx-auto h-full w-full max-w-[300px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_POSTER;
                  }}
                />
              </div>
            </div>

            <div className="lg:hidden">
              <MovieHeader movie={movie} isLoading={isLoading} />
            </div>
          </div>

          <div className="min-w-0">
            <div className="hidden lg:block">
              <MovieHeader movie={movie} isLoading={isLoading} />
            </div>

            <div className="lg:mt-6">
              <div className="text-muted-foreground uppercase">
                {movie.tagline}
              </div>

              <div className="mt-4 text-base sm:text-lg">{movie.overview}</div>
            </div>

            <MovieCredits movieId={id} />

            <Separator />

            <div className="mt-8">
              <h2 className="text-xl font-medium sm:text-2xl">
                Similar Movies
              </h2>
              <SimilarMovies movieId={id} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default MovieDetails;
