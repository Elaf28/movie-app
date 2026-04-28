import tmdbApi from "@/services/axiosConfig";
import { useEffect, useState } from "react";

export function useSimilarMovies(movieId) {
  const [data, setData] = useState({ movies: [], isLoading: true });

  useEffect(() => {
    (async () => {
      try {
        const res = await tmdbApi.get(`/movie/${movieId}/similar`);
        const movies = res.data.results;

        setData({ movies, isLoading: false });
      } catch (error) {
        console.log(error);
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    })();
  }, [movieId]);

  return data;
}
