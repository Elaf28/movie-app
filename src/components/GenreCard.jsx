import React from 'react';

function GenreCard({ genre, posterUrl, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`group relative flex min-w-[260px] snap-start items-center overflow-hidden rounded-lg  px-5 transition hover:bg-primary/70 cursor-pointer ${!isSelected ? 'bg-card' : 'bg-primary/70'}`}
    >
      <div className="flex-1 py-3">
        <div
          className={`text-md font-semibold tracking-wide text-card-foreground group-hover:text-primary-foreground transition-colors ${isSelected && 'text-primary-foreground'}`}
        >
          {genre.name}
        </div>
      </div>

      <div className="relative ml-auto mt-3 -bottom-3">
        <div className="absolute -left-8 top-2 h-20 w-20 rotate-[-8deg] rounded-lg bg-black/20"></div>

        <div
          className={`aspect-square w-20 transition-all duration-300 ${
            isSelected
              ? '-translate-x-[7px] -translate-y-[6px] rotate-[2deg]'
              : 'rotate-[9deg] group-hover:-translate-x-[7px] group-hover:-translate-y-[6px] group-hover:rotate-[2deg]'
          }`}
        >
          <img
            src={posterUrl}
            alt={`${genre.name} category preview`}
            className="h-full w-full rounded-lg object-cover shadow-xl "
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default GenreCard;
