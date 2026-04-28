import AppPagination from '@/components/AppPagination';
import GenreList from '@/components/GenreList';
import SortSelect from '@/components/SortSelect';
import React from 'react';
import { useSearchParams } from 'react-router';
import genre_metadata from '@/constants/genres';
import MovieGrid from '@/components/MovieGrid';
import { Container } from '@/components/Container';
import { useDiscoverMovies } from '@/hooks/useDiscoverMovies';
import ResultsStats from '@/components/ResultsStats';

function DiscoverMovies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = +searchParams.get('page') || 1;
  const genre = searchParams.get('genre');
  const sort = searchParams.get('sort');

  const { movies, totalPages, totalResults, isLoading } = useDiscoverMovies({
    page,
    genre,
    sort,
  });

  const setPage = (newPage) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: newPage });
  };

  const activeGenreLabel = genre_metadata.find(
    (g) => g.id.toString() === genre,
  )?.name;

  const displayTitle = activeGenreLabel || 'Discover Movies';

  return (
    <Container className="py-3 md:py-6 lg:py-14">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">{displayTitle}</h1>
        <SortSelect />
      </div>

      <GenreList />

      <ResultsStats
        isLoading={isLoading}
        displayTitle={displayTitle}
        genre={genre}
        totalResults={totalResults}
      />

      <MovieGrid movies={movies} isLoading={isLoading} />

      <AppPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Container>
  );
}

export default DiscoverMovies;
