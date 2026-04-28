import tmdbApi from "@/services/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useMovieDetails(movieId) {
  const [data, setData] = useState({ movie: null, isLoading: true });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await tmdbApi.get(`/movie/${movieId}`);
        const movie = res.data;
        
        setData({ movie, isLoading: false });
      } catch (error) {
        console.log(error);
        navigate("/404", { replace: true });
      }
    })();
  }, [movieId, navigate]);

  return data;
}
