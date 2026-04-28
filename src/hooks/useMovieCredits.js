import tmdbApi from "@/services/axiosConfig";
import { getMovieMetadata } from "@/utils/movieHelpers";
import { useEffect, useState } from "react";

export function useMovieCredits(movieId) {
  const [data, setData] = useState({ crew: [], topCast: [], isLoading: true });

  useEffect(() => {
    (async () => {
      try {
        const res = await tmdbApi.get(`/movie/${movieId}/credits`);

        const credits = res.data;

        const { crew, topCast } = getMovieMetadata(credits);

        setData({ crew, topCast, isLoading: false });
      } catch (error) {
        console.log(error);
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    })();
  }, [movieId]);

  return data;
}
