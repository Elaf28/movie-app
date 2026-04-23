import React, { useEffect, useState } from "react";
import MovieTrailerPlayer from "@/components/MovieTrailerPlayer";
import tmdbApi from "@/services/axiosConfig";

import { Separator } from "@/components/ui/separator";

import TopCast from "@/components/TopCast";
import MovieCrew from "@/components/MovieCrew";

import { getMovieMetadata } from "@/utils/movieHelpers";
import { useParams } from "react-router";
import MovieHeader from "@/components/MovieHeader";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await tmdbApi.get(`/movie/${id}`, {
        params: { append_to_response: "videos,credits" },
      });
      console.log(res.data);
      setMovie(res.data);
    })();
  }, [id]);

  const topCast = movie?.credits?.cast.slice(0, 18);

  const { director, writers, stars, trailerYoutubeKey } =
    getMovieMetadata(movie);

  return (
    <>
      {movie && (
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
          <div className="w-full">
            <MovieTrailerPlayer
              trailerYoutubeKey={trailerYoutubeKey}
              title={movie.title}
            />
          </div>

          <div className="relative mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr] lg:gap-8">
            <div className="flex flex-row-reverse justify-between gap-4 lg:relative lg:block">
              <div className="w-[150px] lg:sticky lg:top-4 lg:w-full">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt="Movie Poster"
                    className="mx-auto h-full w-full max-w-[300px] object-cover"
                  />
                </div>
              </div>

              <div className="lg:hidden">
                <MovieHeader movie={movie} />
              </div>
            </div>

            <div className="min-w-0">
              <div className="hidden lg:block">
                <MovieHeader movie={movie} />
              </div>

              <div className="lg:mt-6">
                <div className="text-muted-foreground uppercase">
                  {movie.tagline}
                </div>

                <div className="mt-4 text-base sm:text-lg">
                  {movie.overview}
                </div>
              </div>

              <MovieCrew director={director} writers={writers} stars={stars} />

              <TopCast topCast={topCast} />

              <Separator />

              <div className="mt-8">
                <h2 className="text-xl font-medium sm:text-2xl">
                  Similar Movies
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
