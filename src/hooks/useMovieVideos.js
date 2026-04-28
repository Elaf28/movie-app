import tmdbApi from "@/services/axiosConfig";
import { getMovieTrailer } from "@/utils/movieHelpers";
import { useEffect, useState } from "react";

export function useMovieVideos(movieId) {
  const [data, setData] = useState({ trailer: null, isLoading: true });

  useEffect(() => {
    (async () => {
      try {
        const res = await tmdbApi.get(`/movie/${movieId}/videos`);
        const videos = res.data.results;

        const trailer = getMovieTrailer(videos);

        setData({ trailer, isLoading: false });
      } catch (error) {
        console.log(error);
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    })();
  }, [movieId]);

  return data;
}
