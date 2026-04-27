import tmdbApi from '@/services/axiosConfig';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import GenreCard from './GenreCard';
import genre_metadata from '@/constants/genres';
import GenreCardSkeleton from './GenreCardSkeleton';
import ScrollableRow from './ScrollableRow';

function GenreList() {
  const [genres, setGenres] = useState([]);
  const [isGenresLoading, setIsGenresLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGenreId = searchParams.get('genre');

  useEffect(() => {
    (async () => {
      try {
        setIsGenresLoading(true);
        const res = await tmdbApi.get('/genre/movie/list');
        setGenres(res.data.genres);
      } catch (error) {
        console.log(error);
      } finally {
        setIsGenresLoading(false);
      }
    })();
  }, []);

  const handleSelect = (id) => {
    const params = new URLSearchParams(searchParams);
    if (activeGenreId === id.toString()) {
      params.delete('genre');
    } else {
      params.set('genre', id);
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  if (isGenresLoading) {
    return (
      <ScrollableRow className="pb-4 mt-6">
        {[...Array(6)].map((_, i) => (
          <GenreCardSkeleton key={i} />
        ))}
      </ScrollableRow>
    );
  }

  return (
    <ScrollableRow className="mt-6">
      {genres.map((genre) => {
        const posterUrl = genre_metadata.find((g) => g.id === genre.id)?.poster;
        const isSelected = activeGenreId === genre.id.toString();
        return (
          <GenreCard
            key={genre.id}
            genre={genre}
            posterUrl={posterUrl}
            isSelected={isSelected}
            onClick={() => handleSelect(genre.id)}
          />
        );
      })}
    </ScrollableRow>
  );
}

export default GenreList;
