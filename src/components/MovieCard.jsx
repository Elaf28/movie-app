import React from 'react';
import { Heart, Bookmark, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMovieStore } from '@/Store/zustand/useMovieStore';

const MovieCard = ({ movie }) => {
    const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useMovieStore();

    const isFavorite = favorites.some((m) => m.id === movie.id);
    const inWatchlist = watchlist.some((m) => m.id === movie.id);

    const title = movie.title || movie.name;
    const rating = movie.vote_average?.toFixed(1) || "0.0";
    const releaseDate =
        (movie.release_date || movie.first_air_date)?.split('-')[0] || "";

    const mediaType =
        movie.media_type || (movie.first_air_date ? "tv" : "movie");

    const posterUrl =
        movie.poster_path || movie.poster
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster}`
        : "/no-image.png";

    return (
        <Link to={`/movie/${movie.id}`}>
        <div className="group w-full max-w-[200px] cursor-pointer">

            {/* Image */}
            <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">

            <img
                src={posterUrl}
                alt={title}
                className="w-full h-full object-cover"
            />

            {/* Rating */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-xs flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                {rating}
            </div>

            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

                <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(movie);
                }}
                className={`p-3 rounded-full transition ${
                    isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-black/50 text-white hover:bg-red-500"
                }`}
                >
                <Heart size={18} fill={isFavorite ? "white" : "none"} />
                </button>

                <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWatchlist(movie);
                }}
                className={`p-3 rounded-full transition ${
                    inWatchlist
                    ? "bg-primary text-primary-foreground"
                    : "bg-black/50 text-white hover:bg-primary"
                }`}
                >
                <Bookmark size={18} fill={inWatchlist ? "currentColor" : "none"} />
                </button>

            </div>
            </div>

            {/* Info */}
            <div className="mt-2 px-1">
            <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition">
                {title}
            </h3>

            <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                <span>{releaseDate}</span>

                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 uppercase text-[10px]">
                {mediaType}
                </span>
            </div>
            </div>

        </div>
        </Link>
    );
};

export default MovieCard;
import React, { useState } from 'react';
import { Heart, Bookmark, Star, X } from 'lucide-react';

const MovieCard = ({ item, actions, isHorizontal = false, isSearchView = false }) => {
  const { favorites, watchlist, userRatings, toggleAction, handleRate } = actions;
  const [isRateOpen, setIsRateOpen] = useState(false);

  const isFavorite = favorites.some(f => f.id === item.id);
  const isInWatchlist = watchlist.some(w => w.id === item.id);
  const currentRating = userRatings[item.id] || 0;
  const siteAverage = item.vote_average || 0;
  const siteStars = Math.round(siteAverage / 2);
  const percentage = Math.round(siteAverage * 10);

  if (isSearchView) {
    return (
      <div className="flex w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-4 h-[160px] md:h-[200px]">
        {/* الصورة على الشمال */}
        <div className="min-w-[100px] md:min-w-[140px] relative bg-gray-100">
          <img 
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        <div className="flex flex-col p-4 flex-grow overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-[17px] text-[#032541] hover:text-[#01b4e4] transition-colors line-clamp-1">
                {item.title || item.name}
              </h3>
              <p className="text-gray-400 text-sm">{item.release_date || item.first_air_date}</p>
            </div>
            
            <div className="flex gap-2">
               <button onClick={() => toggleAction(item, 'fav')} className={`${isFavorite ? 'text-red-600' : 'text-gray-300 hover:text-red-500'}`}>
                 <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
               </button>
               <button onClick={() => toggleAction(item, 'watch')} className={`${isInWatchlist ? 'text-blue-600' : 'text-gray-300 hover:text-blue-500'}`}>
                 <Bookmark size={18} fill={isInWatchlist ? "currentColor" : "none"} />
               </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-3 line-clamp-2 md:line-clamp-3 leading-relaxed">
            {item.overview || "لا يوجد وصف متاح لهذا العمل حالياً..."}
          </p>

          <div className="mt-auto flex items-center gap-3">
             <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className={siteStars >= s ? "text-yellow-500" : "text-gray-300"} fill={siteStars >= s ? "currentColor" : "none"} />
                ))}
                <span className="text-gray-400 text-[11px] ml-1">({siteAverage.toFixed(1)})</span>
             </div>
             {currentRating > 0 && (
               <div className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold border border-blue-100">
                 My Rate: {currentRating}
               </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  const cardClass = isHorizontal ? "min-w-[300px]" : "min-w-[150px]";
  const imageClass = isHorizontal ? "h-[170px]" : "h-[225px]";

  return (
    <div className={`${cardClass} relative flex flex-col group cursor-pointer`} onMouseLeave={() => setIsRateOpen(false)}>
      <div className={`${imageClass} relative rounded-xl overflow-hidden shadow-md bg-[#dbdbdb]`}>
        <img 
          src={`https://image.tmdb.org/t/p/w500${isHorizontal ? item.backdrop_path : item.poster_path}`} 
          className={`w-full h-full object-cover transition-all duration-500 
            ${isRateOpen ? 'brightness-[0.3] scale-105' : 'group-hover:brightness-[0.4] group-hover:scale-110'}`}
          alt=""
        />

        {/* Hover Icons */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 z-30 
          ${isRateOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <button onClick={(e) => { e.stopPropagation(); toggleAction(item, 'fav'); }} className={`p-2.5 rounded-full transition-all hover:scale-110 ${isFavorite ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-black/80'}`}><Heart size={20} fill={isFavorite ? "white" : "none"} /></button>
          <button onClick={(e) => { e.stopPropagation(); toggleAction(item, 'watch'); }} className={`p-2.5 rounded-full transition-all hover:scale-110 ${isInWatchlist ? 'bg-blue-600 text-white' : 'bg-black/60 text-white hover:bg-black/80'}`}><Bookmark size={20} fill={isInWatchlist ? "white" : "none"} /></button>
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setIsRateOpen(!isRateOpen); }} className={`p-2.5 rounded-full transition-all hover:scale-110 ${currentRating > 0 || isRateOpen ? 'bg-yellow-500 text-white' : 'bg-black/60 text-white hover:bg-black/80'}`}><Star size={20} fill={currentRating > 0 ? "white" : "none"} /></button>
            {isRateOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-14 bg-white rounded-lg shadow-2xl p-3 w-[150px] z-50 border border-gray-100" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-2 border-b pb-1"><span className="text-[#032541] font-black text-[14px] uppercase tracking-wider">Rate</span><X size={14} className="text-gray-400 cursor-pointer hover:text-red-500" onClick={() => setIsRateOpen(false)} /></div>
                <div className="flex justify-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star key={num} size={18} className={`cursor-pointer transition-transform hover:scale-125 ${currentRating >= num ? "text-yellow-500" : "text-gray-300"}`} fill={currentRating >= num ? "currentColor" : "none"} onClick={() => handleRate(item.id, num)} />
                  ))}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
              </div>
            )}
          </div>
        </div>

        {!isHorizontal && (
          <div className="absolute left-2 bottom-2 w-9 h-9 bg-[#081c22] rounded-full border-2 border-[#21d07a] flex items-center justify-center z-10 shadow-lg">
            <span className="text-white font-bold text-[10px]">{percentage}%</span>
          </div>
        )}
      </div>

      <div className={`mt-3 ${isHorizontal ? 'text-center' : 'text-left px-1'}`}>
        <h3 className={`font-bold text-[14px] leading-tight line-clamp-2 ${isHorizontal ? 'text-white' : 'text-[#032541]'}`}>{item.title || item.name}</h3>
        <p className="text-gray-400 text-[11px] mt-0.5">{item.release_date || item.first_air_date}</p>
        <div className={`flex items-center mt-2 flex-wrap gap-2 ${isHorizontal ? 'justify-center' : 'justify-start'}`}>
          <div className="flex items-center gap-0.5 border-r border-gray-200 pr-2">
            {[1, 2, 3, 4, 5].map((s) => (<Star key={s} size={11} className={siteStars >= s ? "text-yellow-500" : "text-gray-300"} fill={siteStars >= s ? "currentColor" : "none"} />))}
            <span className="text-gray-500 text-[10px] ml-1 font-bold">({siteAverage.toFixed(1)})</span>
          </div>
          {currentRating > 0 && (
            <div className="flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
              <span className="text-[9px] text-blue-700 font-bold">YOU:</span>
              <div className="flex items-center"><Star size={10} className="text-blue-600" fill="currentColor" /><span className="text-blue-700 font-bold text-[10px] ml-0.5">{currentRating}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
