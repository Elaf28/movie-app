import React, { useEffect, useState } from 'react';
import MovieTrailerPlayer from '@/components/MovieTrailerPlayer';
import tmdbApi from '@/services/axiosConfig';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

function MovieDetails() {
  const id = '361743';

  const [movie, setMovie] = useState(null);

  const formatRuntime = (totalMinutes) => {
    if (!totalMinutes) return 'N/A';

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  useEffect(() => {
    (async () => {
      const res = await tmdbApi.get(
        `/movie/${id}?append_to_response=videos,credits`,
      );
      console.log(res.data);
      setMovie(res.data);
    })();
  }, []);

  return (
    <>
      {movie && (
        <div className="w-full max-w-6xl mx-auto">
          <div className="w-full mb-4">
            <MovieTrailerPlayer
              movieKey={movie.videos?.results[0]?.key}
              title={movie.title}
            />
          </div>

          <div className="grid grid-cols-[300px_1fr] gap-8">
            <div className="w-75 sticky top-2">
              <div className="rounded-2xl overflow-hidden ">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt="Movie Poster"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex gap-3 font-semibold text-lg items-center">
                <h1 className="text-4xl font-extrabold">{movie.title}</h1>
                <span>&bull;</span>
                <div>{new Date(movie.release_date).getFullYear()}</div>
                <span>&bull;</span>
                <div>{formatRuntime(movie.runtime)}</div>

                <div className="flex flex-wrap justify-center gap-2">
                  {movie.genres?.map((genre) => (
                    <Badge
                      key={genre.id}
                      variant="outline"
                      className="text-base"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-lg">{movie.overview}</div>

              <div className="mt-6">
                <Separator />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
