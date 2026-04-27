/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Heart, Bookmark, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMovieStore } from '@/Store/zustand/useMovieStore';

const MovieCard = (props) => {
  const movie = props.movie || props.item;
  const isHorizontal = props.isHorizontal || false;
  const isSearchView = props.isSearchView || false;

  const { favorites, watchlist, toggleFavorite, toggleWatchlist, syncWithUser } = useMovieStore();
  
  const [isRateOpen, setIsRateOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (typeof syncWithUser === 'function') {
      syncWithUser();
    }
  }, [syncWithUser]);

  if (!movie) return null;

  const isFavorite = favorites?.some((f) => f.id === movie.id) || false;
  const isInWatchlist = watchlist?.some((w) => w.id === movie.id) || false;
  
  const title = movie.title || movie.name || "No Title";
  const siteAverage = movie.vote_average || 0;
  const siteStars = Math.round(siteAverage / 2);
  const releaseDate = (movie.release_date || movie.first_air_date)?.split('-')[0] || "N/A";
  
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "/no-image.png";

  if (isSearchView) {
    return (
      <div className="flex w-full bg-white dark:bg-[var(--card)] border border-gray-200 dark:border-[var(--border)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-4 h-[160px] md:h-[200px]">
        <div className="min-w-[100px] md:min-w-[140px] relative bg-gray-100 dark:bg-[var(--sidebar)]">
          <img 
            src={posterUrl} 
            className="w-full h-full object-cover"
            alt={title}
          />
        </div>

        <div className="flex flex-col p-4 flex-grow overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <Link to={`/movie/${movie.id}`}>
                <h3 className="font-bold text-[17px] text-[#032541] dark:text-white hover:text-[var(--primary)] transition-colors line-clamp-1">
                  {title}
                </h3>
              </Link>
              <p className="text-gray-400 text-sm">{releaseDate}</p>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => toggleFavorite(movie)} className={`${isFavorite ? 'text-red-600' : 'text-gray-300 hover:text-red-500'}`}>
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button onClick={() => toggleWatchlist(movie)} className={`${isInWatchlist ? 'text-blue-600' : 'text-gray-300 hover:text-blue-500'}`}>
                <Bookmark size={18} fill={isInWatchlist ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-2 leading-relaxed">
            {movie.overview || "No description available..."}
          </p>

          <div className="mt-auto flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} className={siteStars >= s ? "text-yellow-500" : "text-gray-300"} fill={siteStars >= s ? "currentColor" : "none"} />
              ))}
              <span className="text-gray-400 text-[11px] ml-1">({siteAverage.toFixed(1)})</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`cursor-pointer group relative flex flex-col shrink-0 transition-all duration-300 ${isHorizontal ? "w-[300px]" : "w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px]"}`}
      onMouseLeave={() => setIsRateOpen(false)}
    >
      <div className={`relative rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-[var(--card)] border border-gray-100 dark:border-[var(--border)] ${isHorizontal ? "h-[170px]" : "h-[180px] sm:h-[210px] md:h-[240px] lg:h-[270px]"}`}>
        
        <img 
          src={posterUrl} 
          className={`w-full h-full object-cover transition-all duration-700 
            ${isRateOpen ? 'brightness-[0.2] scale-105' : 'group-hover:brightness-[0.3] group-hover:scale-110'}`}
          alt={title}
        />

        <div className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-300
          ${isRateOpen ? 'opacity-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}`}>
          
          <div className="flex flex-col gap-3 items-center">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(movie); }} 
              className={`cursor-pointer p-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 ${isFavorite ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-red-600'}`}
            >
              <Heart size={20} fill={isFavorite ? "white" : "none"} />
            </button>

            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWatchlist(movie); }} 
              className={`cursor-pointer p-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 ${isInWatchlist ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-black/60 text-white hover:bg-[var(--primary)]'}`}
            >
              <Bookmark size={20} fill={isInWatchlist ? "currentColor" : "none"} />
            </button>

            <div className="relative">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsRateOpen(!isRateOpen); }} 
                className={`cursor-pointer p-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 ${userRating > 0 || isRateOpen ? 'bg-yellow-500 text-white' : 'bg-black/60 text-white hover:bg-yellow-500'}`}
              >
                <Star size={20} fill={userRating > 0 ? "white" : "none"} />
              </button>
              
              {isRateOpen && (
                <div 
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white dark:bg-[var(--popover)] p-3 rounded-xl shadow-2xl z-[50] w-[150px] border border-gray-200 dark:border-[var(--border)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-2 border-b dark:border-[var(--border)] pb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider dark:text-[var(--chart-2)]">Rate It</span>
                    <X size={14} className="text-gray-400 cursor-pointer hover:text-red-500" onClick={() => setIsRateOpen(false)} />
                  </div>
                  <div className="flex justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star key={num} size={18} className={`cursor-pointer transition-transform hover:scale-125 ${userRating >= num ? "text-yellow-500" : "text-gray-300 dark:text-[var(--border)]"}`} fill={userRating >= num ? "currentColor" : "none"} onClick={() => { setUserRating(num); setIsRateOpen(false); }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 px-1">
        <Link to={`/movie/${movie.id}`}>
          <h3 className={`font-bold text-[15px] leading-tight line-clamp-1 transition-colors 
            ${isHorizontal 
              ? "text-[var(--chart-2)] drop-shadow-sm hover:text-[var(--primary)]" 
              : "text-[#032541] dark:text-[var(--chart-2)] hover:text-[var(--primary)]"}`}>
            {title}
          </h3>
        </Link>
        <p className={`text-[12px] mt-0.5 ${isHorizontal ? "text-[var(--muted-foreground)]" : "text-gray-500 dark:text-[var(--muted-foreground)]"}`}>
          {releaseDate}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;