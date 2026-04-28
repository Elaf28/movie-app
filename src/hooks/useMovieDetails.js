import tmdbApi from "@/services/axiosConfig";
import { useEffect, useState } from "react";

export function useMovieDetails(movieId) {
  const [data, setData] = useState({ movie: null, isLoading: true });

  useEffect(() => {
    (async () => {
      try {
        const res = await tmdbApi.get(`/movie/${movieId}`);
        const movie = res.data;

        setData({ movie, isLoading: false });
      } catch (error) {
        console.log(error);
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    })();
  }, [movieId]);

  return data;
}
