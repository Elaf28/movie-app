import { useState, useEffect } from 'react';
import tmdbApi from '@/services/axiosConfig';

export function useDiscoverMovies(params) {
  const [data, setData] = useState({
    movies: [],
    totalPages: 1,
    totalResults: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { page, genre, sort } = params;

        const config = { params: { page, include_adult: false } };
        if (genre) config.params.with_genres = genre;
        if (sort) config.params.sort_by = sort;

        const res = await tmdbApi.get('/discover/movie', config);

        setData({
          movies: res.data.results,
          totalPages: res.data.total_pages,
          totalResults: res.data.total_results,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params]);

  return { ...data, isLoading };
}
