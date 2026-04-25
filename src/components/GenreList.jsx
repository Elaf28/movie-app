import tmdbApi from '@/services/axiosConfig';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GenreCard from './GenreCard';
import genre_metadata from '@/constants/genres';

function GenreList() {
  const [genres, setGenres] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGenreId = searchParams.get('genre');
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await tmdbApi.get('/genre/movie/list');
      setGenres(res.data.genres);
    })();
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;

      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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

  return (
    <div className="group/list relative w-full mt-6">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-primary hover:text-primary-foreground focus:outline-none opacity-0 group-hover/list:opacity-100 hidden md:flex cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="w-full flex gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-4"
      >
        {genres.map((genre) => {
          const posterUrl = genre_metadata.find(
            (g) => g.id === genre.id,
          )?.poster;
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
      </div>

      {/* Right Arrow - Hidden if canScrollRight is false */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-primary hover:text-primary-foreground focus:outline-none opacity-0 group-hover/list:opacity-100 hidden md:flex cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

export default GenreList;
