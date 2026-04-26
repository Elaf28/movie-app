import AppPagination from '@/components/AppPagination';
import GenreList from '@/components/GenreList';
import SortSelect from '@/components/SortSelect';
import tmdbApi from '@/services/axiosConfig';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import genre_metadata from '@/constants/genres';

function DiscoverMovies() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = +searchParams.get('page') || 1;
  const genre = searchParams.get('genre');
  const sort = searchParams.get('sort');

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const config = { params: { page } };
        if (genre) config.params.with_genres = genre;
        if (sort) config.params.sort_by = sort;

        const moviesResponse = await tmdbApi.get('/discover/movie', config);

        setMovies(moviesResponse.data.results);
        setTotalPages(moviesResponse.data.total_pages);
        setTotalResults(moviesResponse.data.total_results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, genre, sort]);

  const setPage = (newPage) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: newPage });
  };

  const activeGenreLabel = genre_metadata.find(
    (g) => g.id.toString() === genre,
  )?.name;

  const displayTitle = activeGenreLabel || 'Discover Movies';

  return (
    <Container className="py-3 md:py-6 lg:py-10">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">{displayTitle}</h1>
        <SortSelect />
      </div>

      <GenreList />

      {totalResults > 0 && !isLoading && (
        <p className="text-muted-foreground text-base text-center mt-4">
          There are {totalResults.toLocaleString()} {genre ? displayTitle : ''}{' '}
          movies
        </p>
      )}

      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default DiscoverMovies;
