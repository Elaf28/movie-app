import AppPagination from '@/components/AppPagination';
import tmdbApi from '@/services/axiosConfig';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

function DiscoverMovies() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = +searchParams.get('page') || 1;

  useEffect(() => {
    (async () => {
      const res = await tmdbApi.get('/discover/movie', { params: { page } });
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
      setTotalResults(res.data.total_results);
    })();
  }, [page]);

  const setPage = (newPage) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: newPage });
  };

  return (
    <>
      {console.log(movies)}

      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}

export default DiscoverMovies;
