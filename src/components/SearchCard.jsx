/* eslint-disable no-unused-vars */
import React from 'react';
import { Heart, Bookmark, Star } from 'lucide-react';
import { useMovieStore } from '@/Store/zustand/useMovieStore'; 

const SearchCard = ({ item }) => {
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useMovieStore();
  
  const isFavorite = favorites.some(f => f.id === item.id);
  const isInWatchlist = watchlist.some(w => w.id === item.id);
  
  const siteStars = Math.round((item.vote_average || 0) / 2);

  return (
    <div className="flex w-full bg-white dark:bg-[var(--card)] border border-gray-200 dark:border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-[160px] md:h-[200px] mb-6">
      
      <div className="min-w-[100px] md:min-w-[140px] bg-gray-200 dark:bg-[var(--sidebar)]">
        <img 
          src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/no-image.png"} 
          className="w-full h-full object-cover"
          alt={item.title || item.name}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col p-4 flex-grow overflow-hidden">
        <div className="flex justify-between gap-4">
          <div className="overflow-hidden">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-[var(--chart-2)] truncate">
              {item.title || item.name}
            </h3>
            <p className="text-zinc-500 dark:text-[var(--chart-2)]/70 text-sm font-medium">
              {item.release_date || item.first_air_date}
            </p>
          </div>
          
          <div className="flex gap-1 shrink-0">
            <ActionButton 
              active={isFavorite} 
              onClick={() => toggleFavorite(item)} 
              Icon={Heart} 
              activeColor="text-red-500" 
            />
            <ActionButton 
              active={isInWatchlist} 
              onClick={() => toggleWatchlist(item)} 
              Icon={Bookmark} 
              activeColor="text-[var(--primary)]" 
            />
          </div>
        </div>

        <p className="text-zinc-600 dark:text-[var(--secondary-foreground)]/80 text-sm mt-2 line-clamp-2 md:line-clamp-3 leading-relaxed">
          {item.overview || "No description available."}
        </p>

        <div className="mt-auto flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < siteStars ? "text-yellow-500 fill-yellow-500" : "text-zinc-300 dark:text-[var(--chart-2)]/30"} 
            />
          ))}
          <span className="text-zinc-400 dark:text-[var(--chart-2)]/60 text-xs ml-1 font-bold">
            ({item.vote_average?.toFixed(1)})
          </span>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ active, onClick, Icon, activeColor }) => (
  <button 
    onClick={(e) => {
      e.preventDefault(); 
      onClick(); 
    }} 
    className={`p-2 rounded-full transition-all ${active ? activeColor : 'text-zinc-300 dark:text-[var(--chart-2)]/50 hover:bg-zinc-100 dark:hover:bg-[var(--secondary)]'}`}
  >
    <Icon size={18} fill={active ? "currentColor" : "none"} />
  </button>
);

export default SearchCard;